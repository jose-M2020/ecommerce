'use strict';

require("dotenv").config()
// const jwt = require('jwt-simple');
const jwt = require('jsonwebtoken');
const moment = require('moment');
// const secret = 'MySecretKey';

exports.createToken = user => {
    const payload = { 
        sub: user._id,
        nombres: user.nombres,
        apellidos: user.apellidos,
        email: user.email,
        rol: user.rol,
        // iat: moment.unix(),
        // exp: moment().add(7, 'days').unix()
    }

    // return jwt.encode(payload, secret);

    return jwt.sign(
        payload,
        process.env.ACCESS_TOKEN_SECRET, 
        {
            expiresIn: 86400, // 24 hours
        }
    ) 
}