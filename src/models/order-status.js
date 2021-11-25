'use strict';

const orderStatus = (sequelize, DataTypes) => {
    const model = sequelize.define('orderStatus', {
      StatusName: { type: DataTypes.STRING, allowNull: false, unique: true },
    });
}
  module.exports = orderStatus;