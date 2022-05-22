const carModel = require("../model/carModel");
const catchAsync = require("../utilis/catchAsync");
 

exports.insertCar = catchAsync(async function (req, res, next) {
    let car = {};
    car.model = req.body.model;
    car.plate_no = req.body.plate_no;
    car.status = req.body.status;
    car.cond = req.body.cond;
    //Check If This warehouse has space
   // car.warehouse_id = req.body.warehouse_id; We don't need to insert a WH it will be inserted automatically "either  by location when added and capacity or by capacity only for now " 
    car.name = req.body.name;

    const newCar = await carModel.create(car);
    res.status(202).json({
        statusCode:202,
        message:"sucess",
        carId:newCar.insertId
    });





});

exports.Search4Car = catchAsync(async function (req, res, next) {
    let car = {};
    car.model = req.body.model;
    car.plate_no = req.body.plate_no;
    car.status = req.body.status;
    car.cond = req.body.cond;
    //Check If This warehouse has space
   // car.warehouse_id = req.body.warehouse_id; We don't need to insert a WH it will be inserted automatically "eihther  by location when added and capacity or by capacity only for now " 
    car.name = req.body.name;

    const newCar = await carModel.find(req.body);// lsa feha klam m5ls4
    res.status(202).json({
        statusCode:202,
        message:"sucess",
        carId:newCar.insertId
    });





});

exports.DeleteCar = catchAsync(async function (req, res, next) {
    let car = {};
   // car.model = req.body.model;
    car.plate_no = req.body.plate_no; // ana m7tag rkm elplate bs 
   // car.status = req.body.status;
   // car.cond = req.body.cond;
    //Check If This warehouse has space
   // car.warehouse_id = req.body.warehouse_id;
    //  car.name = req.body.name;

    const newCar = await carModel.delete(car);
    res.status(202).json({
        statusCode:202,
        message:"sucess",
        carId:newCar.insertId
    });





});
