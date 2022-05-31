const catchAsync = require("../utilis/catchAsync");
const reservationModel = require("../model/reservationModel");
const warehouseModel = require("../model/warehouseModel");
const carModel = require("../model/carModel");
const demanderModel = require("../model/demanderModel");
const reportsAndSearchModel = require("../model/reportsAndSearchModel");
const AppError = require("../utilis/AppError");
const reportAndSearchModel = require("../model/reportsAndSearchModel");
exports.getCars = async function (req, res, next) {
     
    const cars = await carModel.findAll();
  
    if(req.user && req.user[0].role.toLowerCase() == "admin") {
        return res.render("admin");
    }
    res.render("homeUser",
            {cars:cars}
            ) 

}

exports.showDemanderReservation = async (req, res, next) => {
     
    const demander = await demanderModel.find({pid:req.user.pid});
    if (demander.length == 0) {
        return next(new AppError("You Don't Have any Reservations", 404));
    }
    const demanderId = demander[0].Did;
    const demanderReserv = await reservationModel.find({Did:demanderId});
        //MUSTBEUPDATED SOOO BADD
 
    for (const v of demanderReserv) {
        let car = await carModel.findById(v.car_id);
        v.carModel = car[0].model;
      }
     
    res.render("reserveStatus", {reservations:demanderReserv});
}
exports.signUp = async (req, res, next) => {
    res.render("register");
}

exports.getSearchPage = async(req, res, next) => {
    res.render("advancedsearch");

}


exports.search = async(req, res, next) => {
    const conditions = {};
    conditions.fname = req.body.clientName;
    conditions.email = req.body.clientEmail;
    conditions.cond = req.body.carCondition;
    conditions.mobileno = req.body.mobileNumber;
    conditions.plate_no = req.body.carPlate;
    conditions.model = req.body.carModel;
    conditions.startDate = req.body.startDate;
    conditions.EndDate = req.body.endDate;
    conditions.pay_status = req.body.carPaid;
    conditions.reserve_status = req.body.reservationStatus;
    conditions.reserve_date = req.body.reservationDate;
 const result =   await reportsAndSearchModel.search(conditions);
   
 
res.json({
    status:"success",
    result
});

}

exports.getReport1 = async(req, res, next) => {
   res.render("report1")

};
exports.getReport2 = async(req, res, next) => {
    res.render("report2")
 
 };
 exports.getReport3 = async(req, res, next) => {
    res.render("report3")
 
 };
 exports.getReport4 = async(req, res, next) => {
    res.render("report4")
 
 };

 exports.getReport5 = async(req, res, next) => {
    res.render("report5")
 
 };
 exports.showPaymentForm = async(req, res, next) => {
     console.log("s");
     res.render("checkout");
 }
 exports.getReservations = async (req, res ,next) => {
    const reservations = await reservationModel.findAll();
    console.log(reservations)
    res.render("reservations" , {reservations});

 }