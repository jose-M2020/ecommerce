'use strict';

const express = require('express');
const controller = require('../controllers/ClienteController');
const { verifyToken, roleAuthorization } = require('../middlewares/auth');

const router = express.Router();

router.post('/', controller.registroCliente);

router.post('/login', controller.login);

router.get('/', 
    verifyToken, 
    roleAuthorization(['admin']),
    controller.getItems
);

module.exports = router;