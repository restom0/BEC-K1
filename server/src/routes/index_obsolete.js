const AccountRouter = require('./account-route');
const StudentRouter = require('./student-route');
const StaffRouter = require('./staff-route');
const SPSORouter = require('./spso-route');
const PrinterRouter = require('./printer-route');
const PrintingOrderRouter = require('./printingorder-route');
const PrintingOrderDetailRouter = require('./printingorderdetail-route');
// function route(app) {
//   app.use("/account", AccountRouter);
//   app.use("/printer", PrinterRouter);
//   app.use("/printingorder", PrintingOrderRouter);
//   app.use("/printingorderdetail", PrintingOrderDetailRouter);
//   app.use("/student", StudentRouter);
//   app.use("/staff", StaffRouter);
//   app.use("/spso", SPSORouter);
// }
// module.exports = route;

module.exports = (app) => {
  app.use('/account', AccountRouter);
  app.use('/printer', PrinterRouter);
  app.use('/printingorder', PrintingOrderRouter);
  app.use('/printingorderdetail', PrintingOrderDetailRouter);
  app.use('/student', StudentRouter);
  app.use('/staff', StaffRouter);
  app.use('/spso', SPSORouter);
};
