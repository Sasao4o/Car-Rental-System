const express = require("express");
const app = express();
const dotenv = require("dotenv").config({path:"./config.env"});
const bodyParser = require('body-parser')
const cookieParser = require("cookie-parser")

const userRoute = require("./routes/userRoute"); 
const carRoute = require("./routes/carRoute"); 
const reservationRoute = require("./routes/reservationRoute");
const dashBoardRoute = require("./routes/dashBoardRoute");
const cpcRoute = require("./routes/cpcRoute");
const path = require("path");
const viewRoute = require("./routes/viewRoute");
const warehouseRoute = require("./routes/warehouseRoute");


app.set('view engine', 'ejs');
app.use(cookieParser());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
  }));
  app.use(express.static(path.join(__dirname, 'public')));

app.use("/", viewRoute);
app.use("/api/v1/user", userRoute);
app.use("/api/v1/car", carRoute);
app.use("/api/v1/reservation", reservationRoute);
app.use("/api/v1/dashboard", dashBoardRoute);
app.use("/api/v1/warehouse", warehouseRoute);
app.use("/api/v1/cpc", cpcRoute);

    //Handle The Error
app.use((err,req,res,next) => {
    console.log(err);
     res.status(400).json( err );
 
});
app.listen(3000, () => {
    console.log("Connecting To Server");
})