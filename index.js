'use strict';

const { db } = require('./src/models/index');
const server = require('./src/server.js');
require('dotenv').config()
const PORT = process.env.PORT || 3030;

db.sync().then(() => {
  server.start(3020);
});