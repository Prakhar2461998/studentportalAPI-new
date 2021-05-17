const http = require('http');
const express= require('express');
const cors = require('cors');


const port = process.env.PORT || 3001;
const app=require('./app');

app.use(cors())

const server = http.createServer(app);

server.listen(port);



