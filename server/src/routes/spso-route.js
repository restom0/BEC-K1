const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const router = express.Router();
const userauth = require('../auth/check-auth');

const SPSO = require('../app/controllers/SPSOController');
const PrintOrderController = require('../app/controllers/PrintOrderController');

//SIGNUP SERVICE CREATE NEW SPSO USER INCLUDING: NEW ACCOUNT INSTANCE & SPSO ID

router.get('/', (req, res, next) => {
  return res.status(200).json({
    message: 'This is spso route',
  });
});

router.post('/signup', async (req, res, next) => {
  try {
    const { email, password, name, profile_image, phone_number, spso_ID } =
      req.body;

    if (
      typeof email === 'undefined' ||
      typeof password === 'undefined' ||
      typeof name === 'undefined' ||
      typeof profile_image === 'undefined' ||
      typeof phone_number === 'undefined' ||
      typeof spso_ID === 'undefined'
    ) {
      return res.status(400).json({
        error: {
          message: 'Invalid request data format',
        },
      });
    }

    const mydata = await SPSO.signup({
      email,
      password,
      name,
      profile_image,
      phone_number,
      spso_ID,
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

router.get('/printer', async (req, res, next) => {
  try {
    const mydata = await SPSO.getAllPrinter();
    return res.status(200).json(mydata);
  } catch (err) {
    next(err);
  }
});

router.get('/printer/:id', async (req, res, next) => {
  try {

    const id = req.params.id;
    const mydata = await SPSO.getPrinter(id);

    if (mydata.data.error) {
      return res.status(404).json(mydata.data);
    }

    return res.status(200).json(mydata);
  } catch (err) {
    next(err);
  }
});

router.post('/printer', async (req, res, next) => {
  try {

    const { brand, model, shortDescription, location, printerStatus } =
      req.body;
    if (
      typeof location === 'undefined' ||
      typeof printerStatus === 'undefined'
    ) {
      return res.status(400).json({
        error: {
          message:
            'invalid reques data format: location and printerStatus field must be specified',
        },
      });
    }

    const mydata = await SPSO.addPrinter({
      brand,
      model,
      shortDescription,
      location,
      printerStatus,
    });

    if (mydata.error) {
      return res.status(400).json(mydata.error);
    }
    return res.status(200).json(mydata);
  } catch (err) {
    next(err);
  }
});

router.patch('/printer/:id', async (req, res, next) => {
  try {

    const status = req.body.status;
    const id = req.params.id;
    if (status !== 'false' && status !== 'true') {
      return res.status(400).json({
        error: {
          message: 'Request failed',
        },
      });
    }

    const mydata = await SPSO.updatePrinterStatus(id, status);

    if (mydata.data.error) {
      return res.status(400).json(mydata.data);
    }

    return res.status(200).json(mydata);
  } catch (err) {
    next(err);
  }
});

router.delete('/printer/:id', async (req, res, next) => {
  try {

    const id = req.params.id;
    const mydata = await SPSO.deletePrinter(id);
    if (mydata.data.error) {
      return res.status(400).json(mydata.data);
    }
    return res.status(200).json(mydata.data);
  } catch (err) {
    next(err);
  }
});

router.get('/student', async (req, res, next) => {
  try {
    const mydata = await SPSO.getAllStudent();

    return res.status(200).json(mydata);
  } catch (err) {
    next(err);
  }
});

router.get('/student/:student_ID', async (req, res, next) => {
  try {

    const student_ID = req.params.student_ID;
    const mydata = await SPSO.getStudent(student_ID);

    if (mydata.data.error) {
      return res.status(400).json(mydata.data);
    }

    return res.status(200).json(mydata);
  } catch (err) {
    next(err);
  }
});

//NOT TESTEST YET
router.post(
  '/print-order/permitted-file-type',
  async (req, res, next) => {
    try {

      const permittedFileType = req.body.fileTypes;
      const mydata = await SPSO.setFileType(permittedFileType);
      return res.json(mydata);
    } catch (err) {
      next(err);
    }
  },
);

router.get('/staff', async (req, res, next) => {
  try {

    const mydata = await SPSO.getAllStaff();
    return res.json(mydata);
  } catch (err) {
    next(err);
  }
});

router.get('/staff/:staff_ID', async (req, res, next) => {
  try {

    const staff_ID = req.params.staff_ID;
    const mydata = await SPSO.getStaff(staff_ID);

    if (mydata.data.error) {
      return res.status(400).json(mydata.data);
    }

    return res.status(200).json(mydata);
  } catch (err) {
    next(err);
  }
});

router.post('/set-default-pages', async (req, res, next) => {
  try {

    const amount = req.body.amount;
    const mydata = await SPSO.setDefaultCredit(amount);
    return res.json(mydata);
  } catch (err) {
    next(err);
  }
});

router.get('/all-orders', async (req, res, next) => {
  try {
    const data = await PrintOrderController.getallprintorders();

    if (data.data.error) {
      return res.status(400).json(data.data);
    } else {
      return res.status(200).json(data.data);
    }
  } catch (err) {
    next(err);
  }
});

router.get('/printorders/:user_id', async (req, res, next) => {
  try {
    const user_id = req.params.user_id;
    const data = await PrintOrderController.getprintorders(user_id);

    if (data.data.error) {
      return res.status(400).json(data.data);
    } else return res.status(200).json(data.data);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
