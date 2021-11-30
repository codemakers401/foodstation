'use strict'
const express = require("express")
const { billCollection, ordersCollection, itemsCollection } = require('../models/index')
const router = express.Router()
const basicAuth = require('../middleware/basic');
const bearerAuth = require("../middleware/bearer");
const permissions = require("../middleware/acl.js");
const host = process.env.HOST||'https://foodstation-2021.herokuapp.com';
const io = require('socket.io-client')(host)
const socket = io.connect(host)
socket.on('updateBill',c=>{
  console.log('\x1b[34m ricieved a msg from servet in oerder : ',c);})


router.post('/order', bearerAuth, permissions('read'), async (req, res, next) => {

  let ItemDetails = await itemsCollection.readItem(req.body.itemID);
  let item = req.body;
  item.price = ItemDetails[0].itemPrice
  item.totalItem = ItemDetails[0].itemPrice * req.body.qty
  item.billID = 0

  let bill = {
    custID: req.user.id,
    statusID : 1,
    totalBill:Number(ItemDetails[0].itemPrice * req.body.qty)
  }

  let billRecord = await billCollection.create(bill);
  item.billID = billRecord.id
  let orderRecord = await ordersCollection.create(item);
  
  
socket.emit('createOrder',billRecord);
socket.on('newOrder',c=>{
  console.log(c);
  let x=[orderRecord ,c]
  // res.status(201).json(x);
  // res.status(201).json(c);
})
socket.on('updateBill',c=>{
  console.log(c);
  let x=[orderRecord ,c]
  res.status(201).json(x);
  // res.status(201).json(c);
})

});
router.get('/order', bearerAuth, permissions('read'), async (req, res, next) => {
  let bill = await billCollection.readOrders(req.user.id);
console.log(bill);
  res.status(200).json(bill);
});
router.get('/order/:id', bearerAuth, permissions('read'), async (req, res, next) => {
  let bill = await billCollection.readOrders(req.user.id,req.params.id);
console.log(bill);
  res.status(200).json(bill);
});
router.get('/runorder', bearerAuth, permissions('read'), async (req, res, next) => {
  let bill = await billCollection.readRunningOrders(req.user.id);
console.log(bill);
  res.status(200).json(bill);
});
//==============================
router.get('/allOrders', bearerAuth, permissions('delete'), async (req, res, next) => {
  let bill = await billCollection.readAllOrders();
// console.log(bill);
  res.status(200).json(bill);
});

router.get('/allOrders/:id', bearerAuth, permissions('delete'), async (req, res, next) => {
  let bill = await billCollection.readAllOrders(req.params.id);
// console.log(bill);
  res.status(200).json(bill);
});
//=======================================================================


router.put('/order/:id',bearerAuth,permissions('update-status'),updateStatus)

async function updateStatus(req, res) {
  try {
    let id =req.params.id
    let obj = {};
    obj.statusID = req.body.statusID  
    let updatedRecord = await billCollection.update(id, obj);
    socket.emit('billUpdate',updatedRecord)
    res.status(200).json(updatedRecord);
  } catch (err) {
    throw new Error(err.message);
  }
}
//=======================================================================


module.exports = router;