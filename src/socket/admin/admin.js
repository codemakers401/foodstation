'use strict';

const io = require('socket.io-client');
const host = 'http://localhost:5000';

const socket = io.connect(host)

socket.on('delivered',deliveredOrder)

function deliveredOrder(payload)
{
    console.log(`Admin: Thank you for ordering ${payload.orderId}`);
}
// emit means alert or notification

setTimeout(() => {
    let store1={
        Restaurant: 'KFC',
        Location:'Amman'
    }
    socket.emit('makeorder')
    socket.emit('pickup' ,store1)
    socket.emit('new_message' ,store1)
 
    socket.on('message',payload=>{
        console.log('Received an order', payload);
        socket.emit('received',payload)
    })   
    socket.on('added',payload=>{
        console.log('Thank you for adding the order to the queue ',payload);
        socket.disconnect();
    })
}, 1000);

module.exports=deliveredOrder