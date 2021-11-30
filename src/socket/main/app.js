'use strict'


const PORT = process.env.PORT || 3000;
const server = require('socket.io')(PORT)
const events = require('../event-pool')
const uuid = require('uuid').v4;

const msgQueue = {
    chores: {}
}

function eventHandler(event,payload)
{
    console.log('Event',(event,payload));
}

events.on('pickup',(payload)=>{
  eventHandler('pickup',payload)
})
events.on('in-transit',(payload)=>{
  eventHandler('transit',payload)
})
events.on('delivered',(payload)=>{
  eventHandler('delivered',payload)
})

server.on('connection', (socket) => {

    console.log('CONNECTED', socket.id);
  
    console.log('NEW MESSAGE', socket.id);
    socket.on('new_message',message=>{
      console.log('Adding new message');
      const id =uuid
  
      msgQueue.chores[id] = message
      console.log('After adding the message queue: ',msgQueue);
  
      socket.emit('added',message)
      server.emit('new_message',{id:id, message: msgQueue.chores[id]})
      
    })
  
    console.log('RECEIVED MESSAGE', socket.id);
    socket.on('received',payload=>{
      // delete msgQueue.chores[payload.id]
      console.log('received & remove it from the queue');
  
      delete msgQueue.chores[payload.id];
      console.log('after deleting the task from Msg Q >>', delete msgQueue.chores[payload.id]);
  
  })
  
  console.log('GET ALL MESSAGES', socket.id);
  socket.on('get_all',()=>{
    console.log('Get all messages');
    Object.keys(msgQueue.chores).forEach(id=>{
      socket.emit('get_all',{id:id, payload: msgQueue.chores[id]})
      socket.emit('message-delivered',{id:id, payload: msgQueue.chores[id]})
    })
  })
  
  
    console.log('ADMIN CONNECTED', socket.id);
    socket.on('pickup', (payload) => {
      server.emit('pickup',payload)
      server.emit('delivered',payload)
    });
  
    console.log('CUSTOMER CONNECTED',socket.id);
    socket.on('makeorder',(payload)=>{
  
    })
  
  });

  module.exports={eventHandler}