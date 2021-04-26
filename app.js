const express= require('express');

const app=express();
app.use(express.json());
const signupRoute= require('./routes/signup')
const loginRoute=require('./routes/login');

app.use('/signup' , signupRoute);
app.use('/login', loginRoute);


module.exports=app;