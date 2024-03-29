const express = require('express');
const app = new express();
const router = require('./src/routes/api')
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize')
const cors = require('cors');
const hpp = require('hpp');
require('dotenv').config();
const mongoose = require('mongoose');



app.use(cors())
app.use(helmet())
app.use(mongoSanitize())
app.use(hpp())

// Middleware to parse JSON data with a size limit of 50mb
app.use(express.json({ limit: '50mb' }));

// Middleware to parse URL-encoded data with a size limit of 50mb
app.use(express.urlencoded({ limit: '50mb', extended: true }));


// rate limite here

const limiter = rateLimit({ windowMs: 15 * 60 * 60, max: 10000 })
app.use(limiter)



let URI = "mongodb+srv://antu:antu1900@cluster0.oa3ocsh.mongodb.net/sales"
let OPTION = {user : "antu", pass : 'antu1900', autoIndex : true};

mongoose.connect(URI,OPTION)
    .then((res)=> {
        console.log("DB Connected")
    })
    .catch((err)=> {
        console.log(err)
    })


app.use("/api/sales",router);
app.use("*",(req,res)=>{
    res.status(404).json({status:"fail",data:"Not Found"})
});

// postmen linl
// https://www.postman.com/dark-shadow-118698/workspace/sales-analytic/collection/29231456-6a9ca137-25a3-4b26-afc3-aa72eb59b8ab?action=share&creator=29231456


module.exports = app;






