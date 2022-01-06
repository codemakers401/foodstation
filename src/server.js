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
  console.log('\x1b[36m%s\x1b[0m', 'Client Socket connected');
  socket.on('createOrder',(order)=>{
    console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>');
    socket.join(order.custID)
    setInterval(() => io.to(order.custID).emit('newOrder','your order was accepted'), 100);
    console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>');
  })
  socket.on('billUpdate',updatedRecord=>{
    console.log(updatedRecord,"===================================================================================================")
    io.to(updatedRecord.custID).emit('updateBill',`your order status is >>> ${updatedRecord.statusID}`)
  })
  socket.on('billGPS',(gpsObj)=>{
  (gpsObj.rooms && gpsObj.rooms.length>0) && gpsObj.rooms.map(room =>{
  io.to(room.userID).emit('updateBill',`${gpsObj.gps.lat},${gpsObj.gps.lon}`)}
)
  })
});
const getApiAndEmit = socket => {
  const response = new Date();
  // Emitting a new message. Will be consumed by the client
  socket.emit("FromAPI", response);
};
let interval;
io.on("connection", (socket) => {
  console.log("New client connected");
  if (interval) {
    clearInterval(interval);
  }
  // interval = setInterval(() => getApiAndEmit(socket), 1000);
  // socket.on("disconnect", () => {
  //   console.log("Client disconnected");
  //   clearInterval(interval);
  // });
});
module.exports = {
  server: server,
  start: (port) => {
    if (!port) { throw new Error('Missing Port'); }
    server.listen(port, () => console.log(`Listening on ${port}`));
  },
};