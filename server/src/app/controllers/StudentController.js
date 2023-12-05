const accountmodel = require('../models/Account');
const studentmodel = require('../models/Student');
const mongoose = require('mongoose');

const {
  generatepassword,
  formatedata,
  generatesignature,
  validatepassword,
  generatesalt,
} = require('../../auth/side');

class StudentController {
  //SIGNUP SERVICE
  async signup(userinputs) {
    const { email, password, name, profile_image, phone_number, student_ID } =
      userinputs;
    const existUser = await accountmodel.findOne({ email: email });
    const existStudent_ID = await studentmodel.findOne({
      student_ID: student_ID,
    });

    if (existUser || existStudent_ID) {
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
          role: 'student',
          profile_image: profile_image,
          phone_number: phone_number,
          salt: salt,
        });

        const newStudent = new studentmodel({
          student_ID: student_ID,
          account: newAccount._id,
        });

        const [newAccountResult, newStudentResult] = await Promise.all([
          newAccount.save(),
          newStudent.save(),
        ]);

        const result = {
          message: 'Account created successfully',
          email: newAccountResult.email,
          name: newAccountResult.name,
          role: newAccountResult.role,
          student_ID: newStudentResult.student_ID,
        };

        return result;
      } catch (err) {
        throw err;
      }
    }
  }
}

module.exports = new StudentController();
