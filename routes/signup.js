const express= require('express');
const { Model } = require('mongoose');
const Student = require(`../models/students`);
const Aes = require('aes-256-gcm');
const jwt=require('jsonwebtoken');
const generateAuthToken = require('../models/students')
const authCheck=require('../middleware/auth')
require('../db/conn');

const router=express.Router();

router.post('/',(req,res)=>{

  console.log("entered insdie the post")
    const studentInfo = new Student(req.body); 
    console.log(studentInfo);
    
    var generator = require('generate-password');
    var password = generator.generate({
        length: 5 ,
        numbers: true
    });
    console.log(password,"passw");
    const SHARED_SECRET = '12345678901234567890123456789012';
    let { ciphertext, iv, tag } = Aes.encrypt(password, SHARED_SECRET);
    console.log(ciphertext,"cypher")
    studentInfo.password=ciphertext;
    let cleartext = Aes.decrypt(ciphertext, iv, tag, SHARED_SECRET);
    
 
      

   studentInfo.save().then(()=>{

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
      
       
        let info = await transporter.sendMail({
          from: '"Rooman Student Portal" <online@rooman.net>', // sender address
          to: `${req.body.EmailAddress}`, // list of receivers
          subject: "Rooman Student Portal Access", // Subject line
          text: "Your accoun has been created ", // plain text body
          html: `<b>Dear ${req.body.Firstname}</b><br><b>Your account has been created in Student Portal. </b><br>Website :- https://student.rooman.com<br>Username :- ${req.body.EmailAddress} <br> Password :- '${cleartext}'<br> Thank You.`, // html body
        });
      
        console.log("Message sent: %s", info.messageId);
        
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
     
       }
      
       main().catch(console.error);
         res.status(201).send(studentInfo);
          
     }).catch((e)=>{
         res.status(400).send(e);
     })   
});

module.exports=router;

 