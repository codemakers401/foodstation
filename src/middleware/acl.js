'use strict'

module.exports = (capability) => {
  return (req, res, next) => {
    try {
      console.log(req.user);
      if (req.user.actions.includes(capability)) {
        next();
      }
      else {
        next('Access Denied  --- acl');
      }
    } catch (e) {
      next('Invalid Login  --- acl');
    }
  }
}