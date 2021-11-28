'use strict'

const express = require("express")
const { userCollection } = require('../models/index');
const router = express.Router()
// const basicAuth = require('../middleware/basic');
const bearerAuth = require("../middleware/bearer");
const permissions = require("../middleware/acl.js");

router.get('./profile/',bearerAuth,permissions('read'),hundlerGetOne)
router.put('./profile/',bearerAuth,permissions('read'),hundlerUpdate)
router.delete('./profile/',bearerAuth,permissions('read'),hundlerDelete)


async function hundlerGetOne(req, res) {
  try {
    let allRecords = await userCollection.get(req.user.id);
    res.status(200).json(allRecords);
  } catch (err) {
    throw new Error(err.message);
  }
}


async function hundlerUpdate(req, res) {
  try {
    const obj = req.body;
    let updatedRecord = await userCollection.update(req.user.id, obj);
    res.status(200).json(updatedRecord);
  } catch (err) {
    throw new Error(err.message);
  }
}


async function hundlerDelete(req, res) {
  try {
    let deletedRecord = await userCollection.delete(req.user.id);
    res.status(200).json(deletedRecord);
  } catch (err) {
    throw new Error(err.message);
  }
}
module.exports=router;