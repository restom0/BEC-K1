const mongoose = require('mongoose');
async function connect() {
  try {
    await mongoose.connect('mongodb+srv://thaingocrang2014:wh3rhS2eaeh5rQNK@cluster0.lcj2oyv.mongodb.net/ssps');
    console.log('Connect success');
  } catch (error) {
    console.log('Connect failed');
  }
}
module.exports = { connect };
