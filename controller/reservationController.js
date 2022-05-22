const reservationModel = require("../model/reservationModel");
const catchAsync = require("../utilis/catchAsync");
 

exports.AddReservation = catchAsync(async function (req, res, next) {
    let reserve = {};
    reserve.Did = req.body.Did;
    reserve.plate_no = req.body.plate_no;
    reserve.reserve_status = req.body.reserve_status;
    reserve.startDate = req.body.startDate;
    reserve.EndDate = req.body.endDate;
    reserve.car_id = req.body.car_id;
    reserve.Eid = req.body.Eid;
    reserve.CarStatus= req.body.CarStatus;
    reserve.reserve_date = req.body.reserve_date;
    const newReserve = await reservationModel.create(reserve);
    res.status(202).json({
        statusCode:202,
        message:"sucess",
        carId:newReserve.insertId
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
