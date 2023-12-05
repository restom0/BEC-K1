const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const PrintOrder = new Schema({
  user: { type: Schema.Types.ObjectId, required: true, ref: 'Account' },
  printer: { type: Schema.Types.ObjectId, required: true, ref: 'Printer' },
  beginTime: Date,
  estimatedEndTime: Date,
  timeToFinish: Number,
  note: String,
  status: { type: Boolean, required: true, default: false }, //true = done, false = undone
  fileLocation: { type: String, default: null },
  fileName: { type: String, required: true },
  printProperties: {
    paperSize: { type: String, default: 'a4' },
    numberOfPages: { type: Number, required: true },
    sided: { type: Boolean, default: true }, //true = double sided ; false = single sided
    copies: { type: Number, default: 1 },
    pagesPerSheet: { type: Number, default: 1 },
    orientation: { type: Boolean, default: false }, //false = vertical ; true = horizontal
  },
});
module.exports = mongoose.model('PrintOrder', PrintOrder);
