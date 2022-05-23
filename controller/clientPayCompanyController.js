const clientPayCompanyModel = require("../model/clientPayCompanyModel");
const catchAsync = require("../utilis/catchAsync");
 

exports.insertPayment = catchAsync(async function (req, res, next) {
    let CPC = {};
    CPC.pay_date = req.body.pay_date;
    CPC.reserve_id = req.body.reserve_id;
    CPC.Did = req.body.Did;
    CPC.cost = req.body.cost;
   

    const newCPC = await clientPayCompanyModel.create(CPC);
    res.status(202).json({
        statusCode:202,
        message:"sucess",
        carId:newCPC.insertId
    });
    const newCPC2 = await clientPayCompanyModel.create2(CPC);
    res.status(202).json({
        statusCode:202,
        message:"sucess",
        carId:newCPC2.insertId
    });

    const newCPC3 = await clientPayCompanyModel.UpdateRes(CPC);
    res.status(202).json({
        statusCode:202,
        message:"sucess",
        carId:newCPC3.insertId
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
exports.FindLatePay = catchAsync(async function (req, res, next) {
    let CPC = {};
    CPC.Did = req.body.Did;

    const newCPC = await clientPayCompanyModel.findMyLatepay(CPC.Did);
    res.status(202).json({
        statusCode:202,
        message:"sucess",
        carId:newCPC.insertId
    });





});
