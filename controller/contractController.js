const contractModel = require("../model/contractModel");
const catchAsync = require("../utilis/catchAsync");
 

exports.AddContract = catchAsync(async function (req, res, next) {
    let contract = {};

   contract.sid = req.body.sid;
   contract.car_id = req.body.car_id;
   contract.cost = req.body.cost;
   contract.status = req.body.status;
   contract.start_date = req.body.start_date;
   contract.end_date = req.body.end_date;

    const newContract = await contractModel.create(contract);
    res.status(202).json({
        statusCode:202,
        message:"sucess",
        carId:newContract.insertId
    });





});

exports.Search4Cont = catchAsync(async function (req, res, next) {
    let contract = {};

    contract.contra_id = req.body.contra_id;
       
     const newContract = await contractModel.findById(contract.contra_id);
     res.status(202).json({
         statusCode:202,
         message:"sucess",
         carId:newContract.insertId
     });





});


exports.Search4ContBySid = catchAsync(async function (req, res, next) {
    let contract = {};

    contract.sid = req.body.sid;
       
     const newContract = await contractModel.find4Sid(contract.sid);
     res.status(202).json({
         statusCode:202,
         message:"sucess",
         carId:newContract.insertId
     });





});


exports.Search4ContByCarId = catchAsync(async function (req, res, next) {
    let contract = {};

    contract.car_id = req.body.car_id;
       
     const newContract = await contractModel.find4CarId(contract.car_id);
     res.status(202).json({
         statusCode:202,
         message:"sucess",
         carId:newContract.insertId
     });





});


exports.UpdateCarId = catchAsync(async function (req, res, next) {
    let contract = {};

    contract.car_id = req.body.car_id;
       
     const newContract = await contractModel.updateCarId(contract);
     res.status(202).json({
         statusCode:202,
         message:"sucess",
         carId:newContract.insertId
     });





});





exports.DeleteCar = catchAsync(async function (req, res, next) {
    let contract = {};

    contract.contra_id = req.body.contra_id; 
   

    const newContract = await contractModel.deleteById(contract.contra_id);
    res.status(202).json({
        statusCode:202,
        message:"sucess",
        carId:newContract.insertId
    });

    




});


exports.DeleteCar4Sid = catchAsync(async function (req, res, next) {
    let contract = {};

    contract.sid = req.body.sid; 
   

    const newContract = await contractModel.ExpellSupplier(contract.sid);
    res.status(202).json({
        statusCode:202,
        message:"sucess",
        carId:newContract.insertId
    });

    




});
