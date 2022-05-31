const carModel = require("../model/carModel");
const AppError = require("../utilis/AppError");
const catchAsync = require("../utilis/catchAsync");
 

exports.insertCar = catchAsync(async function (req, res, next) {
    let car = {};
    car.model = req.body.model;
    car.plate_no = req.body.plate_no;
    car.status = "active";
    car.cond = req.body.cond;
    //Check If This warehouse has space
    car.warehouse_id = req.body.warehouse_id;
    car.name = req.body.name;

    const newCar = await carModel.create(car);
    res.status(202).json({
        statusCode:202,
        message:"success",
        carId:newCar.insertId
    });


});
exports.getAvailableCars = catchAsync(async function (req, res, next) {
const availCars = await carModel.find({Status:"active"});
res.status(200).json({
    status:"Success",
    cars:availCars
})

});
exports.updateCarStatus = catchAsync(async function (req, res, next) { 
    
    const carId = req.body.id;
    const carStatus = req.body.status;
 
    if (!carId || !carStatus) {
        return next(new AppError("Please Enter Id and Status",404));
    }
    const car = await carModel.updateById(carId, {status:carStatus});
   
    res.status(202).json({
        status:"success",
        updatedCount:car.changedRows
    })


});

exports.getCarByPeriod = catchAsync(async function (req, res, next) { 
    
 
   var start_date=req.body.start_date;
   var end_date=req.body.end_date;
   var plate_no = req.body.plate_no;
    const cars = await carModel.findAllCarByPeriod(plate_no, start_date,end_date);
    res.status(202).json({
        statusCode:202,
        message:"success",
        cars
        
    });



});

exports.ViewStat = catchAsync(async function (req, res, next) {
    let date = req.body.date;
    const cars = await carModel.findStatAll(date);
    res.status(202).json({
        statusCode:202,
        message:"success",
        cars
    });





});
