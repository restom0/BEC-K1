const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const Student = new Schema({
  student_ID: { type: String, minLength: 7, maxLength: 7, required: true },
  account: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Account',
    require: true,
  },
});
module.exports = mongoose.model('Student', Student);
