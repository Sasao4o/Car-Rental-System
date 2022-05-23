const express = require("express");
const app = express();
const dotenv = require("dotenv").config({path:"./config.env"});
const bodyParser = require('body-parser')

const userRoute = require("./routes/userRoute"); 
const carRoute = require("./routes/carRoute"); 
const reservationRoute = require("./routes/reservationRoute");
const dashBoardRoute = require("./routes/dashBoardRoute");

app.use(bodyParser.json());
app.use("/api/v1/user", userRoute);
app.use("/api/v1/car", carRoute);
app.use("/api/v1/reservation", reservationRoute);
app.use("/api/v1/dashboard", dashBoardRoute);

    //Handle The Error
app.use((err,req,res,next) => {
     console.log(err);
  
});
app.listen(3000, () => {
    console.log("Connecting To Server");
})