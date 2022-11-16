'use strict';

const express = require('express');
const controller = require('../controllers/AdminController');
const { verifyToken, roleAuthorization } = require('../middlewares/auth');
const validate = require('../middlewares/validations/admin.validation')


const router = express.Router();

router.get('/', 
    verifyToken, 
    roleAuthorization(['admin']),
    controller.getItems
);

router.get('/:id',
    verifyToken,
    roleAuthorization(['admin']),
    validate.getById,
    controller.getItem
);

router.post('/',
    verifyToken, 
    roleAuthorization(['admin']),
    validate.validate,
    validate.registro,
    controller.registroAdmin
);

router.post('/login', 
    validate.login,
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
    validate.delete,
    controller.deleteItem
);

module.exports = router;