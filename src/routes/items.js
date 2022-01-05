'use strict';

const express = require('express');
const item = express.Router();
const { itemsCollection } = require('../models/index');
const bearerAuth = require('../middleware/bearer')
const permissions = require('../middleware/acl.js')


item.get(('/item'), bearerAuth, permissions('read'), async (req, res, next) => {
  const menu = await itemsCollection.readItem();
  console.log('menu', menu)
  const list = menu.map(item => {
    let menu2 = {
      itemId: item.id,
      itemName: item.itemName,
      itemCategory: item.itemCategory,
      itemPrice: item.itemPrice,
      restaID: item.restaID,
      itemimg:item.itemimg,
      available: item.available,
      restaurantName: item.restaurant.restaurantName,
      Location: item.restaurant.restaurantLocation

    }
    return menu2
  });
  res.status(200).json(list);
});
item.get('/item/:id', bearerAuth, permissions('read'), async (req, res, next) => {
  let oneItem = await itemsCollection.readItem(req.params.id);
  console.log(oneItem);
  let resultData = '';
  if (oneItem) {
    const list = oneItem.map(item => {
      let itemlist = {
        itemId: item.id,
        itemName: item.itemName,
        itemCategory: item.itemCategory,
        itemPrice: item.itemPrice,
        restaID: item.restaID,
        itemimg:item.itemimg,

        available: item.available,
        restaurantName: item.restaurant.restaurantName,
        Location: item.restaurant.restaurantLocation
      }
      return itemlist;
    });
    if (list[0].itemId > 0) { (resultData = list) } else { (resultData = oneItem) }
  }
  else {
    resultData = 'Sorry the item You are ask for not available';
  }
  res.status(200).json(resultData);
});

item.put('/item/:id', bearerAuth, permissions('delete'), async (req, res, next) => {
  let item = {}
  req.body.itemName && (item.itemName = req.body.itemName);
  req.body.itemCategory && (item.itemCategory = req.body.itemCategory);
  req.body.itemPrice && (item.itemPrice = req.body.itemPrice);
  req.body.itemimg && (item.itemimg = req.body.itemimg);

  req.body.restaID && (item.restaID = req.body.restaID);
  (req.body.available||req.body.available===false)  && (item.available = req.body.available);


  console.log('===========>',item,req.body.available);
  let updateItem = await itemsCollection.update(req.params.id, item);
  console.log(updateItem);
  res.status(200).json(updateItem);
});

item.post('/item', bearerAuth, permissions('delete'), async (req, res, next) => {
  let newObj = req.body;

  console.log(newObj);
  console.log("itemsCollection", itemsCollection);

  let newItem = await itemsCollection.create(newObj);
  console.log("newItem", newItem);
  res.status(200).json(newItem);
});

item.delete('/item/:id', bearerAuth, permissions('delete'), async (req, res, next) => {
  let deletedItem = await itemsCollection.delete(req.params.id);
  console.log(deletedItem);
  res.status(200).json(deletedItem);
});

item.get('/itemByRes/:id', bearerAuth, permissions('read'), async (req, res, next) => {
  let oneItem = await itemsCollection.readItemByResId(req.params.id);
  console.log(oneItem);
  let resultData = '';
  if (oneItem[0].id) {
    const list = oneItem.map(item => {
      let itemList = {
        itemId: item.id,
        itemName: item.itemName,
        itemCategory: item.itemCategory,
        itemPrice: item.itemPrice,
        itemimg:item.itemimg,

        restaID: item.restaID,
        available: item.available,
        restaurantName: item.restaurant.restaurantName,
        Location: item.restaurant.restaurantLocation
      }
      return itemList;
    });
    (resultData = list)
  }
  else {
    resultData = 'Sorry the item You are ask for not available';
  }
  res.status(200).json(resultData);
});
module.exports = item;