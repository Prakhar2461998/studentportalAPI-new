const express= require('express');
const Student = require('../models/students');
const router=express.Router();
router.put("/", (req,res)=>{
    
    var EmailAddress= req.body.EmailAddress;
    Student.findOne({EmailAddress:EmailAddress}, function(err,studentInfo){
        if(err)
      {
        console.log(err);
        return res.status(500).send();
      }
      else if(!studentInfo){
      
        return res.send(404).send();
      }    
         else{

            Student.findOne({password:password})
            .exec()
            .then()
         }
         
    })


})

module.exports=router;