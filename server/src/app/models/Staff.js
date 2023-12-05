const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const Staff = new Schema({
  staff_ID: { type: String, minLength: 7, maxLength: 7, require: true },
  account: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Account',
    require: true,
  },
});
module.exports = mongoose.model('Staff', Staff);
