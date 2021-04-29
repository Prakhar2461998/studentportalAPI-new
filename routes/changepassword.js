const express= require('express');
const router=express.Router();
router.post("/", (req,res)=>{
    
    res.send('Change Password ');
})



module.exports=router;