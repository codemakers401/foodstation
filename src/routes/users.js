'use strict';

const express = require('express');
const authRouter = express.Router();

const { userCollection } = require('../models/index');
const basicAuth = require('../middleware/basic.js')
const bearerAuth = require('../middleware/bearer')
const permissions = require('../middleware/acl.js')

authRouter.post('/signup', async (req, res, next) => {
  try {

    let userRecord = await userCollection.create(req.body);
    const output = {
      user: userRecord,
      token: userRecord.token
    };
    res.status(201).json(output);
  } catch (e) {
    next(e.message)
  }
});

authRouter.post('/signin', basicAuth, (req, res, next) => {
  const user = {
    user: req.user,
    token: req.user.token
  };
  res.status(200).json(user);
});

authRouter.get(('/users'), bearerAuth, permissions('delete'), async (req, res, next) => {
  const userRecords = await userCollection.read();
  const list = userRecords.map(user => {
    let userData = {
      userId: user.id,
      username: user.username,
      userEmail: user.userEmail,
      userRole: user.userRole,
    }
    return userData
  });
  res.status(200).json(list);
});
authRouter.get('/users/:id', bearerAuth, permissions('delete'), async (req, res, next) => {
  let userRecords = await userCollection.read(req.params.id);
  if (userRecords) {
    const list = userRecords.map(user => {
      let userData = {
        userId: user.id,
        username: user.username,
        userEmail: user.userEmail,
        userRole: user.userRole,
        userAddress: user.userAddress,
        userPhone: user.userPhone,
      }
      return userData
    });
    console.log("list", list);
    if (list[0].userId > 0) { res.status(200).json(list); } else { res.status(406).json(userRecords) }
  }
  else {
    res.status(406).json('Sorry ,,, The ID Should be Integer');
  }
});
authRouter.put('/users/:id', bearerAuth, permissions('delete'), async (req, res, next) => {
  let userData = {}
  req.body.username && (userData.username = req.body.username);
  req.body.userAddress && (userData.userAddress = req.body.userAddress);
  req.body.userPhone && (userData.userPhone = req.body.userPhone);
  req.body.userRole && (userData.userRole = req.body.userRole);
  console.log(userData);
  let userRecords = await userCollection.update(req.params.id, userData);
  console.log(userRecords);
  if (userRecords&&userRecords.id) {
    res.status(200).json(userRecords);
  } else {
    res.status(406).json('Sorry ,,, there was an error with updating record');
  }

});
module.exports = authRouter;