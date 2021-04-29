const express= require('express');
const router=express.Router();
router.post("/", (req,res)=>{
    
    res.send('DELETE USER');
})



module.exports=router;