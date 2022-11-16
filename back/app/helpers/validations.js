const { validationResult } = require('express-validator');
const Admin = require('../models/Admin');

exports.validateAndSanitize = (isPassword = false) => {
  return {
    exists: { 
      errorMessage: 'MISSING',
      bail: true 
    },
    notEmpty: { 
        errorMessage: 'IS_EMPTY',
        options:{
            ignore_whitespace: true,
        },
        bail: true
    },
    trim: isPassword ? false : true,
    escape: isPassword ? false : true,
}
}

exports.validateExistEmail = email => {
    return Admin.findOne({ email }).then(user => {
        if (user) {
          return Promise.reject('E-mail already in use');
        }
      });
}

exports.validationResult = (req, res, next) => {
    try {
      validationResult(req).throw();
      
      if (req.body.email) {
        req.body.email = req.body.email.toLowerCase()
      }
      return next()
    } catch (err) {
      res.status(500).send({
        success: false,
        errors: err.array(),
        data: undefined
    });
    }
}