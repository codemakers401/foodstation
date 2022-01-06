'use strict';

const restaurantSchema = (sequelize, DataTypes) => {
    const model = sequelize.define('restaurants', {
      restaurantName: { type: DataTypes.STRING, allowNull: false, unique: true },
      restaurantLocation: { type: DataTypes.STRING, allowNull: false, },
      resturantimg :{type: DataTypes.STRING, defaultValue :'https://st.depositphotos.com/1026166/3160/v/600/depositphotos_31605339-stock-illustration-restaurant-food-quality-badge.jpg'}
    });
    return model
}
  module.exports = restaurantSchema;