'use strict';

const express = require('express');
const controller = require('../controllers/ClienteController');

const router = express.Router();

router.post('/', controller.registroCliente);

module.exports = router;