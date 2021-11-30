'use strict';

require('dotenv').config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const SECRET = process.env.SECRET || 'zxcvbnm';

const userSchema = (sequelize, DataTypes) => {
  const model = sequelize.define('users', {
    username: { type: DataTypes.STRING, allowNull: false },
    password: { type: DataTypes.STRING, allowNull: false },
    userRole: { type: DataTypes.ENUM('Admin', 'Customer','Driver'), defaultValue: 'Customer' },
    userAddress: { type: DataTypes.STRING, allowNull: false },
    userPhone: { type: DataTypes.STRING, allowNull: false },
    userEmail: { type: DataTypes.STRING, allowNull: false, unique: true },
    token: { type: DataTypes.VIRTUAL },
    actions: {
      type: DataTypes.VIRTUAL,
      get() {
        const acl = {
          Customer: ['read','update-profile' ],
          Driver:   ['read','update-profile','update-status','create'],
          Admin:    ['read','update-profile','update-status','create', 'update', 'delete',],
        }
        return acl[this.userRole];
      }
    }
  });

  model.beforeCreate(async (user) => {
    let hashedPass = await bcrypt.hash(user.password, 10);
    user.password = hashedPass;
  });

  // we attached a function to our Users Model
  model.authenticateBasic = async function (username, password) {
    // get the user form the database 
    const user = await model.findOne({ where: { username } }); // select * from Users where username='tamim';
    // compare the users' password from the DB with the on that was submitted in the form
    const valid = await bcrypt.compare(password, user.password);
    // if the user is validated, we will create a new token for that user using the jsonwebtokenlibaray
    if (valid) {
      let newToken = jwt.sign({ username: user.username }, SECRET);
      user.token = newToken;
      return user;
    } else {
      throw new Error('Invalid User');
    }
  }

  model.authenticateBearer = async function (token) {
    // check with the jwt if the token is proper
    const parsedToken = jwt.verify(token, SECRET); // the parsed token payload, we are parsing the data using the Secret Key
    // then find a user that has the data from the payload
    const user = await this.findOne({ where: { username: parsedToken.username } });////###################
    // if there is, then get the user model
    if (user) {
      return user;
    } else {
      // if not, throw error
      throw new Error('Invalid Token');
    }
  }

  return model
}
module.exports = userSchema;