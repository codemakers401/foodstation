'use strict';

const restaurantSchema = (sequelize, DataTypes) => {
    const model = sequelize.define('restaurants', {
      restaurantName: { type: DataTypes.STRING, allowNull: false, unique: true },
      restaurantLocation: { type: DataTypes.STRING, allowNull: false, },
    });
}
  module.exports = restaurantSchema;