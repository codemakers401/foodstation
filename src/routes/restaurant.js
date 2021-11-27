'use strict'

const express = require("express")
const {restaurantCollection} = require('../models/index')
const router = express.Router()
// const basicAuth = require('../middleware/basic');
const bearerAuth = require("../middleware/bearer");
const permissions = require("../middleware/acl.js");





router.get('/restaurant',bearerAuth,permissions("read"),hundlerGet)
router.post('/restaurant',bearerAuth,permissions("create"),hundlerPost)

router.put('/restaurant/id',bearerAuth,permissions("update"),hundlerUpdate)

router.delete('/restaurant/id',bearerAuth,permissions("delete"),hundlerDelete)

async function hundlerGet(req, res) {
    try {
      let allRecords = await restaurantCollection.get();
      res.status(200).json(allRecords);
    } catch (err) {
      throw new Error(err.message);
    }
  }
  
  
  
  async function hundlerPost(req, res) {
    try {
      let obj = req.body;
      let newRecord = await restaurantCollection.create(obj);
      res.status(201).json(newRecord);
    } catch (err) {
      throw new Error(err.message);
    }
  }
  
  async function hundlerUpdate(req, res) {
    try {
      const id = req.params.id;
      const obj = req.body;
      let updatedRecord = await restaurantCollection.update(id, obj);
      res.status(200).json(updatedRecord);
    } catch (err) {
      throw new Error(err.message);
    }
  }
  
  async function hundlerDelete(req, res) {
    try {
      let id = req.params.id;
      let deletedRecord = await restaurantCollection.delete(id);
      res.status(200).json(deletedRecord);
    } catch (err) {
      throw new Error(err.message);
    }
  }

  module.exports=router;