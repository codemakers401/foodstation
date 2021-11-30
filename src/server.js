'use strict';

const express = require('express');
const cors = require('cors')
require('dotenv').config()

const authRoutes = require('./routes/users');
const item = require('./routes/items');
const profile = require('./routes/profile');
const orderRoutes = require('./routes/orders');
const restaurantRoutes = require('./routes/restaurant');
const status = require('./routes/status')
const socketApp = require('../src/socket/main/app')
const notFoundHandler = require('./error-handlers/404.js');
const errorHandler = require('./error-handlers/500.js');

const app = express();
app.use(express.json());
app.use(cors())
app.use(express.urlencoded({extended:true}))

app.use(authRoutes);
app.use(item)
app.use(profile)
app.use(restaurantRoutes)
app.use(status)
app.use(orderRoutes)

app.use(socketApp)



app.use('*', notFoundHandler);
app.use(errorHandler);

module.exports = {
  server: app,
  start: port => {
    if (!port) { throw new Error('Missing Port'); }
    app.listen(port, () => console.log(`Listening on ${port}`));
  },
};