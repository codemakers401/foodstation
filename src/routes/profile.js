'use strict';
const express = require('express');
const profile = express.Router();
const { userCollection } = require('../models/index');
const bearerAuth = require('../middleware/bearer')
const permissions = require('../middleware/acl.js')

profile.get('/profile', bearerAuth, permissions('update-profile'), async (req, res, next) => {

  let userInfo = await userCollection.read(req.user.id);
  console.log(userInfo);
  let resultData = '';
  if(userInfo){
  const list = userInfo.map(user => {
     user = {
      userId: user.id,
      username: user.username,
      userEmail: user.userEmail,
      userRole: user.userRole,
    }
    return user
  });
  if (list[0].userId>0) { resultData=list } else { resultData=userRecords }
}
else{
  resultData = 'Sorry ,,, The ID Should be Integer';
}
  res.status(200).json(resultData);
});
profile.put('/profile', bearerAuth, permissions('update-profile'), async (req, res, next) => {
   let userData ={}
    req.body.username&&(userData.username = req.body.username);
    req.body.userAddress&&(userData.userAddress = req.body.userAddress);
    req.body.userPhone&&(userData.userPhone = req.body.userPhone);
    console.log(userData);
  let userRecords = await userCollection.update(req.user.id,userData);
  console.log(userRecords);
  res.status(200).json(userRecords);
});
module.exports = profile;



