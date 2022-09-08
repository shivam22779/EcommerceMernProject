const express = require('express');
const app = express();
const errorMiddleware  = require('./middleware/error');
const cookieParser = require('cookie-parser');
const cors = require("cors");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
const path = require("path");


// config
if(process.env.NODE_ENV !== "PRODUCTION"){
    require("dotenv").config({ path: "backend/config/config.env" });
  };
  

app.use(cors({credentials: true, origin: true})); // Parameters for accessing cookies request throught axios


app.use(express.json({limit: '25mb'}));
app.use(cookieParser());

// app.use(bodyParser.urlencoded({extended: true}));
app.use(express.urlencoded({extended: true}))
app.use(fileUpload());




// Routes Import
const product  = require('./routes/productRoute');
const user  = require('./routes/userRoute');
const order  = require('./routes/orderRoute');
const payment  = require('./routes/paymentRoute');

// End point starts here
app.use('/api/v1', product);
app.use('/api/v1', user);
app.use('/api/v1', order);
app.use('/api/v1', payment);


//Serving frontend files
app.use(express.static(path.join(__dirname, "../frontened/build")));

app.get("*", (req, res)=>{
    res.sendFile(path.resolve(__dirname, "../frontened/build/index.html"));
});

// Error handler middleware
app.use(errorMiddleware);
module.exports = app;