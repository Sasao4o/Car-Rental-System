
const userModel = require("../model/userModel");

exports.findAllPayByPeriod = catchAsync(async function (req, res, next) {
  
   
    var start_date=req.body.start_date;
    var end_date=req.body.end_date;
     const newUser = await userModel.findPayByPeriod(start_date,end_date);
     res.status(202).json({
         statusCode:202,
         message:"sucess"
    
     });
 
 
 
 
 
 });
