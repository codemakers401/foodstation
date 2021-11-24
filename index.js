'use strict';

const { db } = require('./src/models');
const server = require('./src/server.js');
require('dotenv').config()
const PORT = process.env.PORT || 5000;

db.sync().then(() => {
  server.start(PORT);
});