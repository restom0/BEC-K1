const accountmodel = require('../models/Account');
const spsomodel = require('../models/SPSO');
const printermodel = require('../models/Printer');
const printordermodel = require('../models/PrintOrder');
const queuemodel = require('../models/Queue');
const multer = require('multer');
const mongoose = require('mongoose');
const {
  generatepassword,
  formatedata,
  generatesignature,
  validatepassword,
  generatesalt,
} = require('../../auth/side');
const { ConnectionClosedEvent } = require('mongodb');

class PrintOrderController {
  async createprintorder(userinputs) {
    const {
      user,
      printer,
      note,
      fileName,
      printProperties,
      beginTime,
      timeToFinish,
      status,
    } = userinputs;
    try {
      //VERIFY IF USER HAS ENOUGH CREDIT TO PRINT FILE
      const myuser = await accountmodel.findById(user);
      let tmp;

      if (printProperties.sided === 'true') {
        tmp = 2;
      } else tmp = 1;

      const total_a4_pages_used = Math.ceil(
        (printProperties.numberOfPages * printProperties.copies) / tmp,
      );

      if (Number(myuser.credit) < Number(total_a4_pages_used)) {
        return formatedata({
          error: {
            message:
              'User does not have enough credit to perform this operation',
            user_current_credit: myuser.credit,
            required: total_a4_pages_used,
          },
        });
      }

      const currentqueue = await queuemodel
        .findOne({ printer: printer })
        .populate({
          path: 'printOrders',
        });

      const totalTime = currentqueue.printOrders.reduce(
        (acc, cur) => acc + cur.timeToFinish,
        0,
      );

      const estimatedEndTime = new Date(
        Number(beginTime) + timeToFinish + totalTime,
      );

      const _id = new mongoose.Types.ObjectId();
      const newOrder = new printordermodel({
        _id: _id,
        user: user,
        printer: printer,
        note: note,
        fileName: fileName,
        printProperties: printProperties,
        beginTime: beginTime,
        estimatedEndTime: estimatedEndTime,
        timeToFinish: timeToFinish,
        status: status,
      });
      const result = await newOrder.save();

      return formatedata({
        message: 'New order created: ',
        // orderID: _id.toString(),
        orderID: _id,
        result: result,
        total_a4_pages_used: total_a4_pages_used,
      });
    } catch (err) {
      throw err;
    }
  }

  async uploader(_id) {
    try {
      const printorder = await printordermodel.findById(_id);
      const fileType = printorder.fileName.split('.');

      if (printorder === null) {
        return formatedata({
          error: {
            message: 'Print order not found',
          },
        });
      }

      const result = await printordermodel.findByIdAndUpdate(
        { _id: _id },
        {
          $set: {
            fileLocation: '/uploads/' + _id + '.' + fileType[1],
          },
        },
      );

      return formatedata({
        message: 'Upload complete',
        result: result,
      });
    } catch (err) {
      throw err;
    }
  }

  async getprintorders(user_id) {
    try {
      const result = await printordermodel.find({ user: user_id });
      return formatedata(result);
    } catch (err) {
      throw err;
    }
  }

  async getoneprintorder(_id) {
    try {
      const result = await printordermodel.findById(_id);
      if (result) {
        return formatedata(result);
      } else {
        return formatedata({
          error: {
            message: 'Order not found',
          },
        });
      }
    } catch (err) {
      throw err;
    }
  }

  async getallprintorders() {
    try {
      const result = await printordermodel.find();
      return formatedata(result);
    } catch (err) {
      throw err;
    }
  }
}

module.exports = new PrintOrderController();
