const express= require('express');
const { Model } = require('mongoose');
require('../db/conn');
require('../routes/signup');
const jwt=require('jsonwebtoken');
const Student = require('../models/students');

const router=express.Router();

router.post('/', (req,res)=>{
    var  EmailAddress = req.body.EmailAddress;
    var password = req.body.password;
    Student.findOne({EmailAddress:EmailAddress, password:password})
    .exec()
    .then(Student =>{

             if(Student==null)

             {
                     res.status(404).json({

                        message:'Auth Failed'
                     })

             }
             else{

               
           var accesstoken= jwt.sign({
               Student:Student

            },
            'secret',
            {
                expiresIn:"1h"
            }
            )
           res.status(200).json({
               message:'User found',
                accesstoken:accesstoken
            })
          
        }

    })
    .catch(err=>{
        res.send(err)
    })
 

});
module.exports=router;
