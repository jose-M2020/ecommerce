'use strict';

const express = require('express');
const controller = require('../controllers/ClienteController');
const { verifyToken, roleAuthorization } = require('../middlewares/auth');

const router = express.Router();

router.get('/', 
    verifyToken, 
    roleAuthorization(['admin']),
    controller.getItems
);

router.get('/:id',
    verifyToken,
    roleAuthorization(['admin']),
    controller.getItem
);

router.post('/', 
    controller.registroCliente
);

router.post('/login', 
    controller.login
);

router.put('/:id', 
    verifyToken, 
    roleAuthorization(['admin']),
    controller.updateItem
)

router.delete('/:id',
    verifyToken,
    roleAuthorization(['admin']),
    controller.deleteItem
);

module.exports = router;