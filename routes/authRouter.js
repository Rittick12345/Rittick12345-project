const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const mobileOtp = require('../models/mobileOtp');

const authRouter = express.Router();
authRouter.use(bodyParser.json());

authRouter.post('/otp/send', (req, res) => {
         
    if(!req.body.phone){
       // var Error = new Error ('please include your mobile number');
        res.statusCode = 400;
        res.json({success: false, message: 'Please incluse your phone number'}) ;  
    };
    function generateOtp () {
        let mainotp = Math.floor(100000 + Math.random() * 900000);
        //var mainotp = Math.floor((Math.random() * 999999) + 100000);
        let otp = mainotp.toString();//converting into string
        return otp;
    };
        /* var otpobject = {
        phone: req.body.phone,
        otp: generateOtp,
        operation: 'login',
        trycount: 0,
        used: false
    };*/
    var newotp = generateOtp;
    mobileOtp.create({
        phone: req.body.phone,
        otp: newotp,
        operation: 'login',
        trycount: 0,
        used: false
    })
    .then((result) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json({success: true, message: 'otp is created'});
    })
    .catch((err) => {
        res.statusCode = 500;
        res.json({success: false, message: 'otp cannot be created'});
    });

});  

authRouter.post('/otp/resend', (req, res) =>{
    if(!req.body.phone){
        // var Error = new Error ('please include your mobile number');
         res.statusCode = 400;
         res.json({success: false, message: 'Please incluse your phone number'});  
         return;
     };

     mobileOtp.find({phone: req.body.phone})
     .then((result) =>{
        if(result != null){
             if(result.trycount <= 3){
                result.trycount = result.trycount + 1;
                result.save()
                .then((result) =>{
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.json({success: true, otp :result.otp});
                })
                .catch((err) =>{
                    res.statusCode = 500;
                    res.json({success: false, message: 'otp cannot be send'});
                });
             }
             else{
                res.statusCode = 500;
                res.setHeader('Content-Type', 'application/json');
                res.json({success: false, status: 'You have already tried 3 times'});
                return;
             }
        }
         
     })
     .catch((err) =>{
         res.statusCode =500;
         res.json({succes: false, message: 'Your credentials cannot be found'});
     });
});

authRouter.post('otp/verify', (req, res) =>{
    if(!req.body.otp){
        res.statusCode = 400;
        res.json({success: true, message: 'Please include the otp'});
        return;
    }
    mobileOtp.findOne({otp: req.body.otp})
    .then((result) =>{
        if(result.otp === req.body.otp){
           
        }
    })
});

module.exports = authRouter;

