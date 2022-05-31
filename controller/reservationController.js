const reservationModel = require("../model/reservationModel");
const carModel = require("../model/carModel");
const employeeModel = require("../model/employeeModel");
const demanderModel = require("../model/demanderModel");
const catchAsync = require("../utilis/catchAsync");
const AppError = require("../utilis/AppError");
 

exports.addReservation = catchAsync(async function (req, res, next) {
    let reserve = {};
    
    const current_user = req.user;
   
    const did = await demanderModel.find({pid:current_user.pid});
    
    if (did.length == 0) return next(new AppError("You cant Do Reservation Right now..", 303));
    
    reserve.Did = did[0].Did;
    reserve.reserve_status = "On";
    reserve.startDate = req.body.startDate;
    reserve.EndDate = req.body.endDate;
    reserve.car_id = req.body.car_id;
  
    //Check If The Demander Already In Reservation and check car status availble to be reserved
    const demanderReserv = await reservationModel.find({Did:reserve.Did, reserve_status:"On"});
    const carReserv = await carModel.find({car_id:reserve.car_id, Status:"active"});
 
    if (demanderReserv.length != 0 || carReserv.length == 0) { 
        return next("Reservation Can't Be Done Please Try Again Later....");
    }

    //Check For An Employee Who is Available Now or Will be available on the reservation date Randomly (UNTIL WE OPTIMIZE IT)
    const employee = await employeeModel.find({In_Work:"Free"});
    if (employee.length == 0) {
        return next("Please The Site Is Busy For Immediate Reservations Please Try Later");
    }
    reserve.Eid = employee[0].eid; 
    /*
        MUSTBEUPDATED
        algorithm to find the most suitable employee conside (location and endtime)
    */
    const updateEmployeeStatus = await employeeModel.updateById(employee[0].eid, {In_Work:"Full Load"});

    //Create Reservation
    const newReserve = await reservationModel.create(reserve);

    //Update Car Status After Reservation
    const carStatus = await carModel.updateById(reserve.car_id, {status:"reserved"});
     
    res.status(202).json({
        statusCode:202,
        message:"success",
        reservationId:newReserve.insertId
    });

 


});

exports.Search4ReserveByPlate = catchAsync(async function (req, res, next) {
    let reserve = {};
    reserve.plate_no = req.body.plate_no;
   
    const newReserve = await reservationModel.findCarRsrv(reserve.plate_no);
    let newReservation = newReserve[0];
    console.log(newReserve);
    res.status(202).json({
        statusCode:202,
        message:"sucess",
        Demander_id:newReservation.Did
    });





});

exports.Search4ReserveByEmp = catchAsync(async function (req, res, next) {
    let reserve = {};
    reserve.Eid = req.body.Eid;
   
    const newReserve = await reservationModel.findEmpRsrv(reserve.Eid);
    res.status(202).json({
        statusCode:202,
        message:"sucess",
        carId:newReserve.insertId
    });





});

exports.findAllRevsByPeriod = catchAsync(async function (req, res, next) {
   let dates = {};
    //reserve.Eid = req.body.Eid;
   dates.start_date=req.body.start_date;
   dates.end_date=req.body.end_date;
    const reservations = await reservationModel.findAllByPeriod(dates.start_date,dates.end_date);
    res.status(202).json({
        statusCode:202,
        message:"success",
       reservations
    });





});

exports.findAllRevsByCus = catchAsync(async function (req, res, next) {
    //let dates = {};
     //reserve.Eid = req.body.Eid;
   // dates.start_date=req.body.start_date;
    //dates.end_date=req.body.end_date;
     const newReserve = await reservationModel.findCusRsrv();
     res.status(202).json({
         statusCode:202,
         message:"sucess"
        // carId:newReserve.insertId
     });
 
 
 
 
 
 });

exports.TerminateReserve = catchAsync(async function (req, res, next) {
    let reserve = {};
    reserve.plate_no = req.body.plate_no;
    reserve.CarStatus= req.body.CarStatus;

   
    const newReserve = await reservationModel.TerminateCarRsrv(reserve.plate_no,reserve.CarStatus);
    res.status(202).json({
        statusCode:202,
        message:"sucess",
        carId:newReserve.insertId
    });





});

exports.terminateReservation = catchAsync(async function (req, res, next) {
    //Check id exists and extract car id from it
    const myReservation = await reservationModel.findById(req.params.id);
    let reserve = myReservation[0];
    if (!reserve) {
        return next("Please Enter Correct Reservation Id");
    }
    const car_id = reserve.car_id;
  
    const updateReserveStatus = await reservationModel.updateById(req.params.id, {reserve_status:"terminated"});

    //Make Car Available Once Again
    const updateCarStatus = await carModel.updateById(car_id, {Status:"active"});
    res.status(202).json({
        status:"success",
        updatedRow:updateReserveStatus.changedRows
    })
 
});


exports.findAllRevsByCus = catchAsync(async function (req, res, next) {
     const id = req.body.id;
     const ress = await reservationModel.findCusRsrv(id);
     res.status(202).json({
         statusCode:202,
         message:"success",
         ress
     });
    });