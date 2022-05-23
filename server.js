const express = require("express");
const app = express();
const dotenv = require("dotenv").config({path:"./config.env"});
const bodyParser = require('body-parser');

const db = require("./db.js");

const userRoute = require("./routes/userRoute"); 
const carRoute = require("./routes/carRoute"); 
const cityRoute = require("./routes/cityRoute"); 
const reservationRoute = require("./routes/reservationRoute");
app.use(bodyParser.json());
app.use("/api/v1/user", userRoute);
app.use("/api/v1/car", carRoute);
app.use("/api/v1/city", cityRoute);
app.use("/api/v1/reservation", reservationRoute);
    //Handle The Error
app.use((err,req,res,next) => {
     console.log(err);
  
});
app.listen(3000, () => {
    console.log("Connecting To Server");
})