const express= require('express');
const cors = require('cors');

const app=express();
app.use(cors())
app.use(express.json());
const signupRoute= require('./routes/signup')
const loginRoute=require('./routes/login');
const logoutRoute=require('./routes/logout');
const forgotRoute=require('./routes/forgotpassword');
const deleteRoute=require('./routes/delete');
const changeRoute=require('./routes/changepassword');


 
app.use('/signup' , signupRoute);
app.use('/login', loginRoute);
app.use('/logout', logoutRoute);
app.use('/forgot-password' , forgotRoute);
app.use('/change-password',changeRoute);
app.use('/delete', deleteRoute);


module.exports=app;