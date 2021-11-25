'use strict';

const orderSchema = (sequelize, DataTypes) => {
    const model = sequelize.define('orders', {
      itemID: { type: DataTypes.INTEGER ,allowNull: false},
      customerID: { type: DataTypes.INTEGER ,allowNull: false },
      qty: { type: DataTypes.INTEGER ,allowNull: false },
      price: { type: DataTypes.INTEGER ,allowNull: false },
      statusID: { type: DataTypes.INTEGER ,allowNull: false },
      
    });
}
  module.exports = orderSchema;