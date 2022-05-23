 
const employeeModel = require("../model/employeeModel");
const userModel = require("../model/userModel");
const catchAsync = require("../utilis/catchAsync");
 
 
exports.hireEmployee = catchAsync(async function (req, res, next) {
    let user = {};
     user.firstname = req.body.firstname;
     user.middlename = req.body.middlename;
     user.lastname = req.body.lastname;
     user.email= req.body.email;
     user.password = req.body.password;
     user.gender = req.body.gender;
     user.role= "user";
     user.cityId = req.body.cityId;
     user.phoneNumber =req.body.phoneNumber;
     user.visaNo=req.body.visaNo;
  
     const newUser = await userModel.create(user);
     if (!newUser) {
         return next("Please Try Hiring Again..");
     }

    //Creating Employee
          
    let employee = {};
    employee.salary = req.body.salary;
    employee.POSITION = req.body.POSITION;
    employee.In_Work = "Free"; 
    employee.pid = newUser.insertId;
    const newEmployee = await employeeModel.create(employee);
    res.status(202).json({
        status:"success",
        message:"Employee Has Been Added"
    })



});