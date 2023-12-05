const accountmodel = require('../models/Account');
const spsomodel = require('../models/SPSO');
const studentmodel = require('../models/Student');
const printermodel = require('../models/Printer');
const staffmodel = require('../models/Staff');
const queuemodel = require('../models/Queue');
const mongoose = require('mongoose');
const {
  generatepassword,
  formatedata,
  generatesignature,
  validatepassword,
  generatesalt,
} = require('../../auth/side');

class SPSOController {
  async spsoAuthorize(user) {
    try {
      const spso = await accountmodel.findOne({ _id: user._id });
      if (spso) {
        return spso.role === 'spso';
      } else {
        return false;
      }
    } catch (err) {
      throw err;
    }
  }
  //SIGNUP SERVICE
  async signup(userinputs) {
    const { email, password, name, profile_image, phone_number, spso_ID } =
      userinputs;
    const existUser = await accountmodel.findOne({ email: email });
    const existSPSO_ID = await spsomodel.findOne({ spso_ID: spso_ID });

    if (existUser || existSPSO_ID) {
      return null;
    } else {
      try {
        let salt = await generatesalt();
        let userPassword = await generatepassword(password, salt);
        const newAccount = new accountmodel({
          _id: new mongoose.Types.ObjectId(),
          email: email,
          password: userPassword,
          name: name,
          role: 'spso',
          profile_image: profile_image,
          phone_number: phone_number,
          salt: salt,
        });

        const newSPSO = new spsomodel({
          spso_ID: spso_ID,
          account: newAccount._id,
        });

        const [newAccountResult, newSPSOResult] = await Promise.all([
          newAccount.save(),
          newSPSO.save(),
        ]);

        const result = {
          message: 'Account created successfully',
          email: newAccountResult.email,
          name: newAccountResult.name,
          role: newAccountResult.role,
          spso_ID: newSPSOResult.spso_ID,
        };

        return result;
      } catch (err) {
        throw err;
      }
    }
  }

  async addPrinter(userinputs) {
    try {
      const { brand, model, shortDescription, location, printerStatus } =
        userinputs;
      const newPrinter = new printermodel({
        _id: new mongoose.Types.ObjectId(),
        brand: brand,
        model: model,
        shortDescription: shortDescription,
        location: location,
        printerStatus: printerStatus,
      });

      const newQueue = new queuemodel({
        _id: new mongoose.Types.ObjectId(),
        printer: newPrinter._id,
      });

      const newQueueResult = await newQueue.save();

      const newPrinterResult = await newPrinter.save();

      return formatedata({
        newPrinter: newPrinterResult,
        newQueue: newQueueResult,
      });
    } catch (err) {
      throw err;
    }
  }

  async updatePrinterStatus(id, status) {
    try {
      const result = await printermodel.findOneAndUpdate(
        { _id: id },
        {
          $set: {
            printerStatus: status,
          },
        },
      );

      if (result) {
        return formatedata({
          message: 'Status updated',
        });
      }
      return formatedata({
        error: {
          message: 'Request failed',
        },
      });
    } catch (err) {
      throw err;
    }
  }

  async deletePrinter(id) {
    try {
      const result = await printermodel.findOneAndDelete({ _id: id });
      if (result) {
        return formatedata({
          message: 'Printer deleted',
        });
      }

      return formatedata({
        error: {
          message: 'Request failed',
        },
      });
    } catch (err) {
      throw err;
    }
  }

  async getAllPrinter() {
    try {
      const result = await printermodel.find();
      return formatedata(result);
    } catch (err) {
      throw err;
    }
  }

  async getPrinter(id) {
    try {
      const result = await printermodel.findById(id);
      if (result) {
        return formatedata(result);
      }
      return formatedata({
        error: {
          message: 'Printer not found',
        },
      });
    } catch (err) {
      throw err;
    }
  }

  async getAllStudent() {
    try {
      const result = await studentmodel.find();
      return formatedata(result);
    } catch (err) {
      throw err;
    }
  }

  async getStudent(student_ID) {
    try {
      const result = await studentmodel.findOne({ student_ID: student_ID });
      if (result) {
        return formatedata(result);
      }

      return formatedata({
        error: {
          message: 'Student not found',
        },
      });
    } catch (err) {
      throw err;
    }
  }
  async getAllStaff() {
    try {
      const result = await staffmodel.find();
      return formatedata(result);
    } catch (err) {
      throw err;
    }
  }

  async getStaff(staff_ID) {
    try {
      const result = await staffmodel.findOne({ staff_ID: staff_ID });
      if (result) {
        return formatedata(result);
      }
      return formatedata({
        error: {
          message: 'Staff not found',
        },
      });
    } catch (err) {
      throw err;
    }
  }

  async setFileType(permittedFileType) {
    try {
      const result = await printermodel.updateMany({
        $set: { permittedFileType: permittedFileType },
      });
      return formatedata(result);
    } catch (err) {
      throw err;
    }
  }

  async setDefaultCredit(amount) {
    try {
      const result = await accountmodel.updateMany({
        $set: { credit: amount },
      });
      return formatedata(result);
    } catch (err) {
      throw err;
    }
  }
}

module.exports = new SPSOController();
