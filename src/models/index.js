'use strict';

const { Sequelize, DataTypes } = require('sequelize');

const DATABASE_URL = process.env.DATABASE_URL || "postgresql://localhost:5432/foodstation";
const DATABASE_CONFIG = process.env.NODE_ENV === 'production' ? {
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    }
  }
} : {};

let sequelize = new Sequelize(DATABASE_URL, seqOptions);

const itemsSchema = require('./items-model');
const orderStatusSchema = require('./order-status');
const ordersSchema = require('./orders-model');
const restaurantSchema = require('./restaurant-model');
const userSchema = require('./users-model');


const itemsModel = itemsSchema(sequelize, DataTypes);
const orderStatusModel = orderStatusSchema(sequelize, DataTypes);
const ordersModel = ordersSchema(sequelize, DataTypes);
const restaurantModel = restaurantSchema(sequelize, DataTypes);
const userModel = userSchema(sequelize, DataTypes);

userModel.hasMany(ordersModel, { foreignKey: 'customerID', sourceKey: 'id' });
ordersModel.belongsTo(userModel, { foreignKey: 'customerID', targetKey: 'id' })

itemsModel.hasMany(ordersModel, { foreignKey: 'itemID', sourceKey: 'id' });
ordersModel.belongsTo(itemsModel, { foreignKey: 'itemID', targetKey: 'id' })

orderStatusModel.hasMany(ordersModel, { foreignKey: 'statusID', sourceKey: 'id' });
ordersModel.belongsTo(orderStatusModel, { foreignKey: 'statusID', targetKey: 'id' })

restaurantModel.hasMany(itemsModel, { foreignKey: 'restaID', sourceKey: 'id' });
itemsModel.belongsTo(restaurantModel, { foreignKey: 'restaID', targetKey: 'id' })

const Collection = require('./collection');

const itemsCollection = new Collection(itemsModel);
const orderStatusCollection = new Collection(orderStatusModel);
const ordersCollection = new Collection(ordersModel);
const restaurantCollection = new Collection(restaurantModel);
const userCollection = new Collection(userModel);



module.exports = {
  db: sequelize,
  itemsCollection: itemsCollection,
  orderStatusCollection: orderStatusCollection,
  ordersCollection: ordersCollection,
  restaurantCollection: restaurantCollection,
  userCollection: userCollection
}