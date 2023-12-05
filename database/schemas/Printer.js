const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
const Printer = new Schema({
  // id: { type: String, minLength: 6, maxLength: 6 }, ===> MÁY IN THÌ CHẮC KHÔNG CẦN ID ĐÂU
  brand: String,
  model: String,
  shortDescription: String,
  location: { type: String, required: true },
  printerStatus: { type: Boolean, required: true, default: false }, //true = available ; false = unavailable
  permittedFileType: { type: Array, default: ['pdf', 'doc', 'docx'] },
});
module.exports = mongoose.model('Printer', Printer);
