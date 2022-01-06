'use strict';

const orderStatus = (sequelize, DataTypes) => {
    const model = sequelize.define('orderStatus', {
      StatusName: { type: DataTypes.STRING, allowNull: false, unique: true },
      statusimg : { type: DataTypes.STRING, allowNull: true ,defaultValue :                        'https://cdn.iconscout.com/icon/premium/png-256-thumb/order-status-4277593-3561687.png'
    }
    });
    return model
}
  module.exports = orderStatus;