'use strict';

const orderSchema = (sequelize, DataTypes) => {
    const model = sequelize.define('orders', {
      itemID: { type: DataTypes.INTEGER ,allowNull: false},
      billID: { type: DataTypes.INTEGER ,allowNull: false },
      qty: { type: DataTypes.INTEGER ,allowNull: false },
      price: { type: DataTypes.INTEGER ,allowNull: false },
      totalItem: { type: DataTypes.INTEGER ,allowNull: false },
      
      
    });
    return model
}
  module.exports = orderSchema;