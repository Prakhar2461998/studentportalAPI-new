const express= require('express');
const router=express.Router();
const jwt=require('jsonwebtoken');

router.post("/", (req,res)=>{

res.cookie('jwt',' ', {maxAge: 1});
res.status(200).send('You have been logged out');

})

module.exports=router;
