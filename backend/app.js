const cors = require('cors')
const dotenv = require('dotenv');
dotenv.config({path:'./config.env'});
const mongoose = require('mongoose');
const express = require('express');
const app = new express();
const PORT = process.env.PORT ;
const jwt = require('jsonwebtoken');
require('./db/conn'); 

app.use(cors()); 
app.use(express.json()); 
app.use(require('./router/auth'));

const consoleURL = (req,res,next)=>{
    console.log(`User at URL : localhost:${PORT}${req.url}`);
    next();
}

app.get('/',consoleURL,(req,res)=>{
   // Get token from header
   const token = req.header('x-auth-token');

   // Check if no token
   if (!token) {
       return res.status(401).json({ msg: 'No token, authorization denied' });
   }

   // Verify token
   try {
       const decoded = jwt.verify(token, config.get('jwtSecret'));
       req.user = decoded.user;
       res.send('Hello world');
   } catch (err) {
       res.status(401).json({ msg: 'Token is not valid' });
   }
});
app.get('*',consoleURL,(req,res)=>{
    res.send(`<center><h1>404 </h1><h3>The Page you are Looking for is Not Found</h3></center>`)
})

app.listen(PORT,()=>{
    console.log(`localhost:${PORT}`)
})