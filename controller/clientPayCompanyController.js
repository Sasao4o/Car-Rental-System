const carModel = require("../model/clientPayCompanyModel");
const catchAsync = require("../utilis/catchAsync");
 

exports.insertPayment = catchAsync(async function (req, res, next) {
    let CPC = {};
    CPC.eid = req.body.eid;
    CPC.pid = req.body.pid;
    CPC.reserve_id = req.body.reserve_id;
    CPC.Did = req.body.Did;
    CPC.cost = req.body.cost;
   

    const newcPC = await clientPayCompanyModel.create(CPC);
    res.status(202).json({
        statusCode:202,
        message:"sucess",
        carId:newCPC.insertId
    });





});


exports.FindEmpPay = catchAsync(async function (req, res, next) {
    let CPC = {};
    CPC.eid = req.body.eid;

    const newCPC = await clientPayCompanyModel.findByEid(CPC.eid);
    res.status(202).json({
        statusCode:202,
        message:"sucess",
        carId:newCPC.insertId
    });





});
