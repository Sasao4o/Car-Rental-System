const express = require("express");
const app = express();
const dotenv = require("dotenv").config({path:"./config.env"});
const bodyParser = require('body-parser')

const userRoute = require("./routes/userRoute"); 
const carRoute = require("./routes/carRoute"); 
 
app.use(bodyParser.json());
app.use("/api/v1/user", userRoute);
app.use("/api/v1/car", carRoute);
    //Handle The Error
app.use((err,req,res,next) => {
     console.log(err);
  
});
app.listen(3000, () => {
    console.log("Connecting To Server");
})