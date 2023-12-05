const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const router = express.Router();
const userauth = require('../auth/check-auth');

const Student = require('../app/controllers/StudentController');

//SIGNUP SERVICE CREATE NEW SPSO USER INCLUDING: NEW ACCOUNT INSTANCE & SPSO ID

router.get('/', (req, res, next) => {
  return res.status(200).json({
    message: 'This is student route',
  });
});

router.post('/signup', async (req, res, next) => {
  try {
    const { email, password, name, profile_image, phone_number, student_ID } =
      req.body;

    if (
      typeof email === 'undefined' ||
      typeof password === 'undefined' ||
      typeof name === 'undefined' ||
      typeof profile_image === 'undefined' ||
      typeof phone_number === 'undefined' ||
      typeof student_ID === 'undefined'
    ) {
      return res.status(400).json({
        message: 'invalid request data format',
      });
    }

    const mydata = await Student.signup({
      email,
      password,
      name,
      profile_image,
      phone_number,
      student_ID,
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
