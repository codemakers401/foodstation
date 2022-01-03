'use strict';
const express = require('express');
const profile = express.Router();
const { userCollection } = require('../models/index');
const bearerAuth = require('../middleware/bearer')
const permissions = require('../middleware/acl.js')

profile.get('/profile', bearerAuth, permissions('update-profile'), async (req, res, next) => {

  let userInfo = await userCollection.read(req.user.id);
  const list = userInfo.map(user => {
     user = {
      userId: user.id,
      username: user.username,
      userEmail: user.userEmail,
      userRole: user.userRole,
      userAddress: user.userAddress,
      userPhone: user.userPhone,
      userimg : user.userimg
    }
    return user
  });
 
  res.status(200).json(list);
});
profile.put('/profile', bearerAuth, permissions('update-profile'), async (req, res, next) => {
   let userData ={}
    req.body.userEmail&&(userData.userEmail = req.body.userEmail);
    req.body.userAddress&&(userData.userAddress = req.body.userAddress);
    req.body.userPhone&&(userData.userPhone = req.body.userPhone);
    req.body.userimg&&(userData.userimg = req.body.userimg);

    
    console.log(userData);
  let userRecords = await userCollection.update(req.user.id,userData);
  console.log(userRecords);
  res.status(200).json(userRecords);
});
module.exports = profile;



