const AccountRouter = require('./account-route');
const StudentRouter = require('./student-route');
const StaffRouter = require('./staff-route');
const SPSORouter = require('./spso-route');
const PrinterRouter = require('./printer-route');
const PrintOrderRouter = require('./printorder-route');
const QueueRouter = require('./queue-route');
// const PrintingOrderRouter = require("./printingorder-route");
// const PrintingOrderDetailRouter = require("./printingorderdetail-route");

module.exports = {
  account: AccountRouter,
  student: StudentRouter,
  staff: StaffRouter,
  spso: SPSORouter,
  printer: PrinterRouter,
  printorder: PrintOrderRouter,
  queue: QueueRouter,
};
