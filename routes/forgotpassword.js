const express= require('express');
const router=express.Router();
const Aes = require('aes-256-gcm');
const jwt=require('jsonwebtoken');
const Student = require('../models/students');

router.post("/", (req,res)=>{
    
    var EmailAddress= req.body.EmailAddress;
    Student.findOne({EmailAddress}, function(err,studentInfo){
      if(err)
      {
        console.log(err);
        return res.status(500).send();
      }
      else if(!studentInfo){
      
        return res.send(404).send();
      }
      else{
        var generator = require('generate-password');
      var password = generator.generate({
          length: 5 ,
          numbers: true
      });
      console.log("Befor encrp======",password)
      const SHARED_SECRET = '12345678901234567890123456789012';
      let { ciphertext, iv, tag } = Aes.encrypt(password, SHARED_SECRET);
      console.log(ciphertext,"cypher")
      studentInfo.password=ciphertext;
      let cleartext = Aes.decrypt(ciphertext, iv, tag, SHARED_SECRET)
           //node
     const nodemailer = require("nodemailer");
  
     // async..await is not allowed in global scope, must use a wrapper
       async function main() {
      // Generate test SMTP service account from ethereal.email
      // Only needed if you don't have a real mail account for testing
      let testAccount = await nodemailer.createTestAccount();
      // create reusable transporter object using the default SMTP transport
      let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
          user: "online@rooman.net", // generated ethereal user
          pass: "rooman123", // generated ethereal password
        },
      });
    // send mail with defined transport object
      let info = await transporter.sendMail({
        from: '"Rooman Student Portal" <online@rooman.net>', // sender address
        to: `${req.body.EmailAddress}`, // list of receivers
        subject: "Rooman Student Portal Access", // Subject line
        text: "Your new password is ", // plain text body
        html: `<b>Dear ${req.body.Firstname}</b><br><b>Your account has been created in Student Portal. </b><br>Website :- Test URl<br>Username :- ${req.body.EmailAddress} <br> Password :- '${dec}'<br> Thank You.`, // html body
      });
      console.log("Message sent: %s", info.messageId);
      // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
     // Preview only available when sending through an Ethereal account
      console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
      // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
     }
    
     main().catch(console.error);
    
        //codeeeeee 
        studentInfo.save().then(()=>{
            res.status(201).send(studentInfo);
        }).catch((e)=>{
            res.status(400).send(e);
        })
      }
    })
})

module.exports=router;
