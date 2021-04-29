const express= require('express');
const Student = require('../models/students');
const router=express.Router();
router.delete("/:id", (req,res)=>{
    
   var student_id= req.params.id;
   Student.findByIdAndRemove(student_id,function(err){
    if(err)
     throw err;
    
     res.send("Successfuly deleted")
   } )
})
module.exports=router;