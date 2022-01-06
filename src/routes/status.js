'use strict'

const express = require("express")
const {orderStatusCollection} = require('../models/index')
const router = express.Router()
const bearerAuth = require("../middleware/bearer");
const permissions = require("../middleware/acl.js");


router.get('/status',bearerAuth,permissions('delete'),handlerGet)
router.get('/status/:id',bearerAuth,permissions('delete'),handlerGetOne)

router.put('/status/:id',bearerAuth,permissions('delete'),handlerUpdate)
router.post('/status',bearerAuth,permissions('delete'),handlerCreate)
router.delete('/status/:id',bearerAuth,permissions('delete'),handlerDelete)


async function handlerGet(req, res) {
    try {
      let allRecords = await orderStatusCollection.read();
      res.status(200).json(allRecords);
    } catch (err) {
      throw new Error(err.message);
    }
  }


  async function handlerGetOne(req, res) {
    try {
      let record = await orderStatusCollection.read(req.params.id);
      console.log('--------------------',record)
      if(record && record[0].id){
      res.status(200).json(record);
    }
      else
      {
          res.status(406).json('There is no record with this id')
      }
    } catch (err) {
      throw new Error(err.message);
    }
  }

  async function handlerUpdate(req, res) {
    try {
      const id = req.params.id;
      const obj = req.body;
      
      let updatedRecord = await orderStatusCollection.update(id, obj);
      console.log('///////////////',updatedRecord);

      if(updatedRecord&&updatedRecord.id){
      res.status(200).json(updatedRecord);
      }else
      {
          res.status(406).json('There was an error with updated ')
      }
    } catch (err) {
      throw new Error(err.message);
    }
  }

  async function handlerCreate(req, res) {
    try {
      let obj = req.body;
      let newRecord = await orderStatusCollection.create(obj);
      if (newRecord&&newRecord.id){
        res.status(201).json(newRecord);
      }else{
        res.status(406).json('There was an error with creating ')
      }
      
    } catch (err) {
      throw new Error(err.message);
    }
  }
  async function handlerDelete(req, res) {
    try{
    let deletedItem = await orderStatusCollection.delete(req.params.id);
    console.log(deletedItem);
    res.status(200).json(deletedItem);
    }catch (err) {
      throw new Error(err.message);
    }
  }
  
  module.exports=router;