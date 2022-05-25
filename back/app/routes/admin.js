'use strict';

const express = require('express');
const controller = require('../controllers/AdminController');

const router = express.Router();

router.post('/', controller.registroAdmin);

module.exports = router;