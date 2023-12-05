const accountmodel = require('../models/Account');
const staffmodel = require('../models/Staff');
const mongoose = require('mongoose');

const {
  generatepassword,
  formatedata,
  generatesignature,
  validatepassword,
  generatesalt,
} = require('../../auth/side');

class StaffController {
  //SIGNUP SERVICE
  async signup(userinputs) {
    const { email, password, name, profile_image, phone_number, staff_ID } =
      userinputs;
    const existUser = await accountmodel.findOne({ email: email });
    const existStaff_ID = await staffmodel.findOne({ staff_ID: staff_ID });

    if (existUser || existStaff_ID) {
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
          role: 'staff',
          profile_image: profile_image,
          phone_number: phone_number,
          salt: salt,
        });

        const newStaff = new staffmodel({
          staff_ID: staff_ID,
          account: newAccount._id,
        });

        const [newAccountResult, newStaffResult] = await Promise.all([
          newAccount.save(),
          newStaff.save(),
        ]);

        const result = {
          message: 'Account created successfully',
          email: newAccountResult.email,
          name: newAccountResult.name,
          role: newAccountResult.role,
          staff_ID: newStaffResult.staff_ID,
        };

        return result;
      } catch (err) {
        throw err;
      }
    }
  }
}

module.exports = new StaffController();
