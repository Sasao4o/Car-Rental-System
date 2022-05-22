const cityModel = require("../model/cityModel");
const catchAsync = require("../utilis/catchAsync");
 

exports.insertCity = catchAsync(async function (req, res, next) {
 let city ={};
 city.name = req.body.cityName;
 city.countryName = req.body.countryName;
 const newCity = await cityModel.create(city);
 res.json({
     statusCode:202,
     message:"Success",
     cityId:newCity.insertId
 })

});
