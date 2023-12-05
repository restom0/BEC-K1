const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const router = express.Router();
const userauth = require('../auth/check-auth');

const AccountController = require('../app/controllers/AccountController');
const PrintOrderController = require('../app/controllers/PrintOrderController');

router.post('/login', async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const { data } = await AccountController.login({ email, password });

    if (data.error) {
      return res.status(400).json(data);
    } else return res.status(200).json(data);
  } catch (err) {
    next(err);
  }
});

router.post('/change-password', userauth, async (req, res, next) => {
  try {
    const { oldPassword, newPassword } = req.body;
    const user = req.user;
    const { data } = await AccountController.changePassword({
      oldPassword,
      newPassword,
      user,
    });
    if (data.error) {
      return res.status(400).json(data);
    } else return res.status(200).json(data);
  } catch (err) {
    next(err);
  }
});

router.post('/buy-credit', userauth, async (req, res, next) => {
  try {
    const { increment } = req.body;
    const user = req.user;
    const { data } = await AccountController.increaseCredit({
      increment,
      user,
    });

    if (data.error) {
      return res.status(400).json(data);
    } else return res.status(200).json(data);
  } catch (err) {
    next(err);
  }
});

router.get('/printorders', userauth, async (req, res, next) => {
  try {
    const user_id = req.user._id;
    const data = await PrintOrderController.getprintorders(user_id);

    if (data.data.error) {
      return res.status(400).json(data.data);
    } else return res.status(200).json(data.data);
  } catch (err) {
    next(err);
  }
});

router.get('/printorders/:printorder_id', async (req, res, next) => {
  try {
    const _id = req.params.printorder_id;
    const data = await PrintOrderController.getoneprintorder(_id);

    if (data.data.error) {
      return res.status(400).json(data.data);
    } else return res.status(200).json(data.data);
  } catch (err) {
    next(err);
  }
});


router.get('/self',userauth,async(req,res,next)=>{
  try{
    const user = req.user;
    const data = await AccountController.getself(user._id);
    
    if (data.data.error){
      return res.status(400).json(data.data);

    } else return res.status(200).json(data.data);

  } catch(err){
    next(err);
  }
})


router.get('/userid/:user_id',async(req,res,next)=>{
  try{  
    const user_id = req.params.user_id;
    const data = await AccountController.getself(user_id);
    if(data.data.error){
      return res.status(400).json(data.data);
    } else return res.status(200).json(data.data);
    
  } catch(err){
    next(err);
  }
})

module.exports = router;
