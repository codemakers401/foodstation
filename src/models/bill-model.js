'use strict';

const orderSchema = (sequelize, DataTypes) => {
    const model = sequelize.define('bills', {
      custID: { type: DataTypes.INTEGER ,allowNull: false},
      
      statusID: { type: DataTypes.INTEGER  },
      totalBill: { type: DataTypes.INTEGER  }, 
      driverid: { type: DataTypes.INTEGER  },  
    });
    return model
}
  module.exports = orderSchema;