'use strict'

module.exports = (capability) => {

  return (req, res, next) => {

    try {
      
      if (req.user.capabilities.includes(capability)) {console.log('aaa')
        next();
        console.log('bbb')
      }
      else {
        next('Access Denied');
      }
    } catch (e) {
      next('Invalid Login');
    }
  }
}