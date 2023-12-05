const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const router = express.Router();
const userauth = require('../auth/check-auth');

const PrinterController = require('../app/controllers/PrinterController');

module.exports = router;
