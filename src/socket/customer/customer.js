'use strict'

const io = require('socket.io-client');
const host = 'http://localhost:5000';
const customerConnection = io.connect(`${host}`);

customerConnection.on('makeorder',makeOrder)

function makeOrder()
{
    let order = {
        Restaurant:'KFC',
        Location:'Amman',
        Meal:'Zinger'
    }
}
module.exports = makeOrder