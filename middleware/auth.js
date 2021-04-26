const jwt=require('jsonwebtoken');
module.exports=(req,res,next)=>{


try{
 var accesstoken= req.body.accesstoken;

var decode=  jwt.verify(acesstoken,'secret');

console.log(accesstoken);
 next();
}catch(error){

    res.status(401).json({
        error:'Invalid Token'
    });
}
}