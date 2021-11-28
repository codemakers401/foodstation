'use strict'
const express = require("express")
const {orderCollection} = require('../models/index')
const router = express.Router()
const basicAuth = require('../middleware/basic');
const bearerAuth = require("../middleware/bearer");
const permissions = require("../middleware/acl.js");



router.get('./order',bearerAuth,permissions('delete'),hundlerGet)
router.get('./order/id',bearerAuth,permissions('read'),hundlerGetOne)
router.post('./order',bearerAuth,permissions('read'),hundlerCreate)
router.put('./order/id',bearerAuth,permissions('read'),hundlerUpdate)
router.delete('./order/id',bearerAuth,permissions('read'),hundlerDelete)

async function hundlerGet(req, res) {
  try {
    let allRecords = await orderCollection.read();
    res.status(200).json(allRecords);
  } catch (err) {
    throw new Error(err.message);
  }
}

async function hundlerGetOne(req, res) {
  try {
    let id = req.user.customerID
    let allRecords = await orderCollection.read(id);
    res.status(200).json(allRecords);
  } catch (err) {
    throw new Error(err.message);
  }
}


async function hundlerCreate(req, res) {
  try {
    let obj = req.body;
    let newRecord = await orderCollection.create(obj);
    res.status(201).json(newRecord);
  } catch (err) {
    throw new Error(err.message);
  }
}

async function hundlerUpdate(req, res) {
  try {
    const id = req.params.id;
    const obj = req.body;
    let updatedRecord = await orderCollection.update(id, obj);
    res.status(200).json(updatedRecord);
  } catch (err) {
    throw new Error(err.message);
  }
}

async function hundlerDelete(req, res) {
  try {
    let id = req.params.id;
    let deletedRecord = await orderCollection.delete(id);
    res.status(200).json(deletedRecord);
  } catch (err) {
    throw new Error(err.message);
  }
}
