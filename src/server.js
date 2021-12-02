'use strict';

const cors = require('cors')
const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);//----------------{Server}
require('dotenv').config()

const authRoutes = require('./routes/users');
const item = require('./routes/items');
const profile = require('./routes/profile');
const orderRoutes = require('./routes/orders');
const restaurantRoutes = require('./routes/restaurant');
const status = require('./routes/status')
const notFoundHandler = require('./error-handlers/404.js');
const errorHandler = require('./error-handlers/500.js');

app.use(cors())
app.use(express.json());

app.use(express.urlencoded({extended:true}))

app.use(authRoutes);
app.use(item)
app.use(profile)
app.use(restaurantRoutes)
app.use(status)
app.use(orderRoutes)

// app.use(socketApp)



app.use('*', notFoundHandler);
app.use(errorHandler);

io.on('connection', (socket)=>{
  console.log('\x1b[41m%s\x1b[0m','>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>');
  console.log('\x1b[36m%s\x1b[0m \x1b[41m%s\x1b[0m', 'Client Socket connected');
  console.log('\x1b[41m%s\x1b[0m','>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>');
  
  socket.on('createOrder',(order)=>{
    socket.join(order.custID)
    io.to(order.custID).emit('newOrder','your order was accepted')
  })
  socket.on('billUpdate',updatedRecord=>{
    console.log('\x1b[44m%s\x1b[0m', updatedRecord);
    io.to(updatedRecord.custID).emit('updateBill',`your order status is >>> ${updatedRecord.status}`)
  })
  socket.on('billGPS',gpsObj=>{
    console.log(`\x1b[34m msg from  driver : \x1b[0m`,gpsObj);
    let orderLocation = gpsObj.id +'-->'+gpsObj.gps
 
    io.to(gpsObj.userID).emit('updateBill',`\x1b[36m(ORDER LOCATION) >>> ${orderLocation}\x1b[0m`)
  })
    
});




module.exports = {
  server: server,
  start: (port) => {
    if (!port) { throw new Error('Missing Port'); }
    server.listen(port, () => console.log(`Listening on ${port}`));
  },
};