const express = require("express");
const app = express();
const dotenv = require("dotenv").config({path:"./config.env"});
const bodyParser = require('body-parser')
const cookieParser = require("cookie-parser")

const userRoute = require("./routes/userRoute"); 
const carRoute = require("./routes/carRoute"); 
const viewRoute = require("./routes/viewRoute");


app.set('view engine', 'ejs');
app.use(cookieParser());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
  }))
app.use("/", viewRoute);
app.use("/api/v1/user", userRoute);
app.use("/api/v1/car", carRoute);
    //Handle The Error
app.use((err,req,res,next) => {
     console.log(err);
 
});
app.listen(3000, () => {
    console.log("Connecting To Server");
})