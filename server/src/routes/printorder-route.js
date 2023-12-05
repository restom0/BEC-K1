const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const router = express.Router();
const userauth = require('../auth/check-auth');
const multer = require('multer');

const PrintOrderController = require('../app/controllers/PrintOrderController');
const QueueController = require('../app/controllers/QueueController');
const AccountController = require('../app/controllers/AccountController');

router.post('/', userauth, async (req, res, next) => {
  try {
    // console.log(req.user);
    let user = req.user._id;
    const { printer, note, fileName, printProperties } = req.body;
    const beginTime = new Date();

    /*
    EACH PAGE TAKES 1000MS = 1 SECOND TO PRINT
    */
    const timeToFinish =
      1000 * printProperties.numberOfPages * printProperties.copies;
    const status = false;
    // const fileLocation = 'somewhereovertherainbow';
    const data = await PrintOrderController.createprintorder({
      user,
      printer,
      note,
      fileName,
      printProperties,
      beginTime,
      timeToFinish,
      status,
    });

    if (data.data.error) {
      return res.status(400).json(data.data);
    }
    const increment = Number(data.data.total_a4_pages_used) * -1;
    user = req.user;

    const creditData = await AccountController.increaseCredit({
      increment,
      user,
    });

    const printOrder = data.data.orderID;
    const queueData = await QueueController.pushorder({ printer, printOrder });

    if (queueData.data.error) {
      return res.status(400).json(queueData.data);
    }

    return res.status(200).json({
      newOrderData: data,
      queueData: queueData,
      credit_changes: creditData,
    });
  } catch (err) {
    next(err);
  }
});

router.post('/upload/:_printorderid', async (req, res, next) => {
  try {
    // console.log("hello world");
    const _id = req.params._printorderid;
    const fileType = 'pdf';
    const storage = multer.diskStorage({
      destination: function (req, file, cb) {
        cb(null, './uploads');
      },
      filename: function (req, file, cb) {
        cb(null, _id + '.' + fileType);
      },
    });

    const fileFilter = (req, file, cb) => {
      if (file.mimetype === 'application/pdf') {
        cb(null, true);
      } else {
        cb(null, false);
      }
    };

    const upload = multer({
      storage: storage,
      limits: {
        fileSize: 1024 * 1024 * 20, // files  smaller than 20MB are accepted
        fileFilter: fileFilter,
      },
    });

    upload.single('printFile')(req, res, function (err) {
      if (err) {
        return res.status(400).json({
          error: {
            message: err,
          },
        });
      }
    });

    const data = await PrintOrderController.uploader(_id);

    if (data.error) {
      return res.status(400).json(data.error);
    }
    return res.status(200).json(data);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
