'use strict';

const { Sequelize, DataTypes } = require('sequelize');
require('dotenv').config()
const DATABASE_URL =  process.env.NODE_ENV === 'test' ? 'sqlite:memory:' : process.env.DATABASE_URL;
const DATABASE_CONFIG = process.env.NODE_ENV === 'production' ? {
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    }
  }
} : {};

let sequelize = new Sequelize(DATABASE_URL, DATABASE_CONFIG);

const itemsSchema = require('./items-model');
const orderStatusSchema = require('./order-status');
const ordersSchema = require('./orders-model');
const restaurantSchema = require('./restaurant-model');
const userSchema = require('./users-model');
const billSchema = require('./bill-model');


const itemsModel = itemsSchema(sequelize, DataTypes);
const orderStatusModel = orderStatusSchema(sequelize, DataTypes);
const ordersModel = ordersSchema(sequelize, DataTypes);
const restaurantModel = restaurantSchema(sequelize, DataTypes);
const userModel = userSchema(sequelize, DataTypes);
const billModel = billSchema(sequelize, DataTypes);
//---------items ==> orders
console.log(itemsModel);
itemsModel.hasMany(ordersModel, { foreignKey: 'itemID', sourceKey: 'id' });
ordersModel.belongsTo(itemsModel, { foreignKey: 'itemID', targetKey: 'id' })
//---------customer ==> bills
userModel.hasMany(billModel, { foreignKey: 'custID', sourceKey: 'id' });
billModel.belongsTo(userModel, { foreignKey: 'custID', targetKey: 'id' })
//---------driver ==> bills
userModel.hasMany(billModel, { foreignKey: 'driverID', sourceKey: 'id' });
billModel.belongsTo(userModel, { foreignKey: 'driverID', targetKey: 'id' })
//---------restaurant ==> items
restaurantModel.hasMany(itemsModel, { foreignKey: 'restaID', sourceKey: 'id' });
itemsModel.belongsTo(restaurantModel, { foreignKey: 'restaID', targetKey: 'id' })
//---------restaurant ==> bills
restaurantModel.hasMany(billModel, { foreignKey: 'restaID', sourceKey: 'id' });
billModel.belongsTo(restaurantModel, { foreignKey: 'restaID', targetKey: 'id' })
//---------status ==> bills
orderStatusModel.hasMany(billModel, { foreignKey: 'statusID', sourceKey: 'id' });
billModel.belongsTo(orderStatusModel, { foreignKey: 'statusID', targetKey: 'id' })
//---------orders ==> bills
billModel.hasMany(ordersModel, { foreignKey: 'billID', sourceKey: 'id' });
ordersModel.belongsTo(billModel, { foreignKey: 'billID', targetKey: 'id' })

const Collection = require('./collection');

const itemsCollection = new Collection(itemsModel);
const orderStatusCollection = new Collection(orderStatusModel);
const ordersCollection = new Collection(ordersModel);
const restaurantCollection = new Collection(restaurantModel);
const userCollection = new Collection(userModel);
const billCollection = new Collection(billModel);



module.exports = {
  db: sequelize,
  itemsCollection: itemsCollection,
  orderStatusCollection: orderStatusCollection,
  ordersCollection: ordersCollection,
  restaurantCollection: restaurantCollection,
  userCollection: userCollection,
  billCollection:billCollection
}