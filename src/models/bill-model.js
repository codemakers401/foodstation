'use strict';

const orderSchema = (sequelize, DataTypes) => {
    const model = sequelize.define('bills', {
      custID: { type: DataTypes.INTEGER ,allowNull: false},
      restaID: { type: DataTypes.INTEGER ,allowNull: false },
      driverID: { type: DataTypes.INTEGER  },
      statusID: { type: DataTypes.INTEGER  },
      totalBill: { type: DataTypes.INTEGER  },     
    });
    return model
}
  module.exports = orderSchema;