const employeePayClientModel = require("../model/employeePayClientModel");
const catchAsync = require("../utilis/catchAsync");
 

exports.insertPayment = catchAsync(async function (req, res, next) {
    let EPC = {};
    EPC.eid = req.body.eid;
    EPC.pid = req.body.pid;
    EPC.contra_id = req.body.contra_id;
    EPC.cost = req.body.cost;
   

    const newEPC = await employeePayClientModel.create(EPC);
    res.status(202).json({
        statusCode:202,
        message:"sucess",
        carId:newEPC.insertId
    });





});

exports.FindEmpPay = catchAsync(async function (req, res, next) {
    let EPC = {};
    EPC.eid = req.body.eid;

    const newEPC = await employeePayClientModel.findByEid(EPC.eid);
    res.status(202).json({
        statusCode:202,
        message:"sucess",
        carId:newEPC.insertId
    });





});








