const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const {
  account,
  student,
  staff,
  spso,
  printer,
  printorder,
  queue,
} = require('./routes');

module.exports = async (app) => {
  app.use(express.json());
  app.use(morgan('dev'));
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  app.use('/uploads', express.static('uploads'));

  // app.use(cors());
  app.use(
    cors({
      // origin: 'http://127.0.0.1:5500',
      methods: 'GET,POST,PUT,DELETE,PATCH',
      credentials: true,
    }),
  );

  app.use('/account', account);
  app.use('/student', student);
  app.use('/staff', staff);
  app.use('/spso', spso);
  app.use('/printer', printer);
  app.use('/printorder', printorder);
  app.use('/queue', queue);

  //   app.use((req,res,next)=>{
  //     res.header('Access-Control-Allow-Origin','*');//give access to specific client, in this case is any client "*"
  //     res.header('Access-Control-Allow-Headers',
  //                 'Origin, X-Requested-With,Content-Type, Accept, Authorization');//give access to specific header
  //     if(req.method === 'OPTIONS'){ //set allowed methods
  //         res.header('Access-Control-Allow-Methods','PUT,POST,PATCH,DELETE,GET');
  //         return res.status(200).json('Okay');
  //     }
  //     next();
  // });

  app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error);
  });

  app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
      error: {
        message:
          'Errors happen, status code: ' +
          (error.status || 500) +
          ' message: ' +
          error.message,
      },
    });
  });
};
