'use strict';

const express = require('express');
const cors = require('cors')
require('dotenv').config()

const authroutes = require('./routes/users');
const authroutes = require('./routes/item');
const authroutes = require('./routes/order');
const authroutes = require('./routes/profile');
const authroutes = require('./routes/restaurant');

const notFoundHandler = require('./error-handlers/404.js');
const errorHandler = require('./error-handlers/500.js');
// const logger = require('./middleware/logger.js');

// const authRouter = require('./routes/routes')
// const v1Routes = require('./routes/v1.js');
// const v2Routes = require('./routes/v2.js');

const app = express();

app.use(express.json());
app.use(cors())
app.use(express.urlencoded({
  extended:true
}))
// app.use(logger);

// app.use(authRouter)
// app.use('/api/v1', v1Routes);
// app.use('/api/v2', v2Routes);
app.use(authroutes);
app.use('/items')
app.use('*', notFoundHandler);
app.use(errorHandler);

module.exports = {
  server: app,
  start: port => {
    if (!port) { throw new Error('Missing Port'); }
    app.listen(port, () => console.log(`Listening on ${port}`));
  },
};