const express = require('express');
const database = require('./config/db');
const expressApp = require('./app');

const startServer = async () => {
  const app = express();
  await database.connect();
  await expressApp(app);
  app.listen(3000);
};
startServer();
