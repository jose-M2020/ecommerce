'use strict';

const express = require('express');
const controller = require('../controllers/AuthController');

const router = express.Router();

router.post('/login', controller.login);

module.exports = router;