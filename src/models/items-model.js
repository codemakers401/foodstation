'use strict';

const itemsSchema = (sequelize, DataTypes) => {
    const model = sequelize.define('items', {
      itemName: { type: DataTypes.STRING, allowNull: false, unique: true },
      itemCategory: { type: DataTypes.STRING, allowNull: false, },
      itemPrice:{type: DataTypes.INTEGER, allowNull: false},
      restaID:{type: DataTypes.INTEGER, allowNull: false}
    });
}
  module.exports = itemsSchema;