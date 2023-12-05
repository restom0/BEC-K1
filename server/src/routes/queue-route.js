const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const router = express.Router();
const userauth = require("../auth/check-auth");

const PrintOrderController = require("../app/controllers/PrintOrderController");
const QueueController = require("../app/controllers/QueueController");
const AccountController = require("../app/controllers/AccountController");

router.get("/", async (req, res, next) => {
  return res.status(200).json({
    messge: "things good",
  });
});

router.post("/next", async (req, res, next) => {
  try {
    const { printer_id } = req.body;
    const { data } = await QueueController.fetchnext(printer_id);
    if (data.error) {
      return res.status(400).json(data);
    }

    // if (data.order){
    //   const increment = data.order.total_a4_pages_used * -1 ;
    //   const user = data.order.user;
    //   // const userdata = await AccountController.increaseCredit({increment,user});
    //   return res.status(200).json({
    //     next_order: data,
    //     user_credit_left: userdata.credit
    //   });
    // }

    return res.status(200).json({
      message: data,
    });
  } catch (err) {
    next(err);
  }
});

router.get("/all", async (req, res, next) => {
  try {
    const { printer_id } = req.query;
    var { data } = await QueueController.getall(printer_id);
    linux_code = [];
    win_code = [];
    if (data.error) {
      return res.status(400).json(data);
    } else {
      if (data.queue) {
        data.queue = data.queue.filter((item) => item.status !== true);
        data.queue.map((el) => {
          let temp =
            `lpr -P Canon-LBP214-UFR-II ` +
            el._id +
            `.pdf -o PageSize=` +
            el.printProperties.paperSize +
            ` CNCopies=` +
            el.printProperties.copies +
            ` Duplex=` +
            (el.printProperties.sided === "true"
              ? "DuplexTumble"
              : "DuplexNoTumble");
          linux_code.push(temp);
          let temp1 =
            `Start-Process -FilePath "lpr" -ArgumentList @(
          ` +
            el._id +
            `.pdf,
          "-o", PageSize=` +
            el.printProperties.paperSize +
            `,
          "-o", CNCopies=` +
            el.printProperties.copies +
            `,
          "-o", Duplex=` +
            (el.printProperties.sided === "true"
              ? "DuplexTumble"
              : "DuplexNoTumble") +
            `) - NoNewWindow - Wait`;
          win_code.push(temp1);
        });
      }
    }
    return res.status(200).json({
      data: data,
      linux_code: linux_code,
      win_code: win_code,
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
