 
const warehouseModel = require("../model/warehouseModel");
 
const catchAsync = require("../utilis/catchAsync");
 
 exports.getAllWH = catchAsync(async (req, res, next) => {
    const warehouses = await warehouseModel.findAll();
    res.status(202).json({
        warehouses
    })

 });
 