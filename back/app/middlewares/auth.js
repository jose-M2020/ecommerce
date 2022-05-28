'use strict';

require("dotenv").config()
const jwt = require('jsonwebtoken');

exports.verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if(!authHeader) {
        return res.status(400).send({message: 'Token not present'});
    }

    const token = req.headers.authorization.replace(/['"]+/g,'');

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) { 
            res.status(403).send({message: 'Token inválido'});
        }
        else {
            req.user = user;
            next();
        }
    })
}

exports.roleAuthorization = roles => (req, res, next) => {

    if(roles.includes(req.user.rol)){
        next();
        return;
    }

    res.status(401).send({message: 'No autorizado'});
}