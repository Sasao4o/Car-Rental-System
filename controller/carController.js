const carModel = require("../model/carModel");
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
        message:"sucess",
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