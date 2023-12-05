const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const router = express.Router();
const userauth = require('../auth/check-auth');

const Staff = require('../app/controllers/StaffController');

//SIGNUP SERVICE CREATE NEW STAFF USER INCLUDING: NEW ACCOUNT INSTANCE & STAFF ID

router.get('/', (req, res, next) => {
  return res.status(200).json({
    message: 'This is staff route',
  });
});

router.post('/signup', async (req, res, next) => {
  try {
    const { email, password, name, profile_image, phone_number, staff_ID } =
      req.body;

    if (
      typeof email === 'undefined' ||
      typeof password === 'undefined' ||
      typeof name === 'undefined' ||
      typeof profile_image === 'undefined' ||
      typeof phone_number === 'undefined' ||
      typeof staff_ID === 'undefined'
    ) {
      return res.status(400).json({
        message: 'invalid request data format',
      });
    }
    const mydata = await Staff.signup({
      email,
      password,
      name,
      profile_image,
      phone_number,
      staff_ID,
    });
    if (mydata === null) {
      return res.status(400).json({
        error: {
          message: 'Invalid email or user ID',
        },
      });
    } else if (mydata.error) {
      return res.status(400).json({
        error: {
          message: 'Request failed',
        },
      });
    }

    return res.status(200).json(mydata);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
