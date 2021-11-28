'use strict'

const express = require("express")
const {restaurantCollection} = require('../models/index')
const router = express.Router()
// const basicAuth = require('../middleware/basic');
const bearerAuth = require("../middleware/bearer");
const permissions = require("../middleware/acl.js");


router.get('/restaurant',bearerAuth,permissions("read"),hundlerGet)
router.get('/restaurant/:id',bearerAuth,permissions("read"),hundlerGetId)
router.post('/restaurant',bearerAuth,permissions("create"),hundlerPost)
router.put('/restaurant/:id',bearerAuth,permissions("update"),hundlerUpdate)

router.delete('/restaurant/:id',bearerAuth,permissions("delete"),hundlerDelete)

async function hundlerGet(req, res) {
    try {
      let allRecords = await restaurantCollection.read();
      res.status(200).json(allRecords);
    } catch (err) {
      throw new Error(err.message);
    }
  }

  async function hundlerGetId(req,res){
    try
    {
      let id = req.params.id;
      let restInfo = await restaurantCollection.read(id)
      if(restInfo)
      {
        res.status(200).json(restInfo)
      }
      else
      {
        res.status(406).json('Sorry ,,, The ID Should be Integer')
      }
      
    }
    catch(err)
    {
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
      if(updatedRecord)
      {
        res.status(200).json(updatedRecord);
      }
      else
      {
        res.status(406).json('Invalid ID for updating or the restaurant name already exists');
      }
      
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