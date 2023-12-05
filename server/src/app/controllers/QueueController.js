const queuemodel = require('../models/Queue');
const printermodel = require('../models/Printer');
const accountmodel = require('../models/Account');
const printordermodel = require('../models/PrintOrder');
const mongoose = require('mongoose');
const {
  generatepassword,
  formatedata,
  generatesignature,
  validatepassword,
  generatesalt,
} = require('../../auth/side');

class QueueController {
  async pushorder(userinputs) {
    const { printer, printOrder } = userinputs;

    try {
      const myqueue = await queuemodel.find({ printer: printer });
      const order = await printordermodel.findById(printOrder);

      if (order && myqueue) {
        myqueue[0].printOrders.push(order);
        const result = await myqueue[0].save();

        if (result) {
          return formatedata({
            message: 'Print order pushed to queue',
            printer: printer,
            printOrder: printOrder,
          });
        }
      }

      return formatedata({
        error: {
          message: 'Request failed',
        },
      });
    } catch (err) {
      throw err;
    }
  }

  async fetchnext(printer_id) {
    try {
      const queue = await queuemodel.find({ printer: printer_id });
      if (queue) {
        const order = await printordermodel.findById(queue[0].printOrders[0]);
        if (order) {
          queue[0].printOrders.shift();

          order.status = true;

          const orderStats = await order.save();
          const result = await queue[0].save();

          return formatedata({
            message: 'Order found',
            order: {
              user: orderStats.user,
              printer: orderStats.printer,
              estimatedEndTime: orderStats.estimatedEndTime,
              actualEndTime: new Date(),
              total_a4_pages_used: Math.ceil(
                (orderStats.printProperties.numberOfPages *
                  orderStats.printProperties.copies) /
                (orderStats.printProperties.sided ? 2 : 1),
              ),
              status: orderStats.status,
              note: orderStats.note,
              fileLocation: `/uploads/${orderStats._id}.pdf`,
            },
            current_queue: result.printOrders,
          });
        }

        return formatedata({
          message: 'Queue Empty',
        });
      }
      return formatedata({
        error: {
          message: 'Request failed',
        },
      });
    } catch (err) {
      throw err;
    }
  }

  async getall(printer_id) {
    try {
      const queue = await queuemodel.findOne({ printer: printer_id }).populate({
        path: 'printOrders',
      });
      if (queue) {
        const result = await printordermodel.findById(queue.printOrders);
        if (result) {
          return formatedata({
            message: 'Order found',
            queue: queue.printOrders,
          });
        }

        return formatedata({
          message: 'Queue Empty',
        });
      }
      return formatedata({
        error: {
          message: 'Request failed',
        },
      });
    } catch (err) {
      throw err;
    }
  }
}

module.exports = new QueueController();
