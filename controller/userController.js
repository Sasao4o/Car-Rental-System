const userModel = require("../model/userModel");
const authTools = require("../utilis/authTools");
const catchAsync = require("../utilis/catchAsync");
exports.signUp = catchAsync(async function (req, res, next) {
    let user = {};
     user.firstname = req.body.firstname;
     user.middlename = req.body.middlename;
     user.lastname = req.body.lastname;
     user.email= req.body.email;
     user.password = req.body.password;
     user.gender = req.body.gender;
     user.role= "user";
     //Client Means He Is Either Demander or Suppiler
     user.cityId = req.body.cityId;
     user.phoneNumber =req.body.phoneNumber;
     user.visaNo=req.body.visaNo;
     
     const newUser = await userModel.create(user);
     
     const jwt = authTools.generateToken({username:newUser.firstname});
     res.cookie("jwt", jwt);
    res.json({
        status:200,
        message:"Success",
        jwt
    });

});

exports.signIn = catchAsync(async function(req, res, next) {
    const email = req.body.email;
    const password = req.body.password;
    console.log(req.body);
    if (!email || !password) {
         return next("Please Enter Email And Password");
    }
    const user = await userModel.find({email});
     
    const currentUser = user[0];
    if (!currentUser) {
        return  next("Please Enters Correct Email And Password");
    }
   
   
    const isPasswordTrue = authTools.verifyPassword(password, currentUser.PASSWORD);
     if (!isPasswordTrue) {
      return  next("Please Enter Correct Email And Password");
     }
     const jwt = authTools.generateToken({id:currentUser.pid});
     res.cookie("jwt", jwt);
     /*
    res.json({
        status:404,
        message:"Success",
        jwt
    });
    */
     res.redirect("/");
});

exports.signOut = catchAsync(async function (req, res ,next) {
    //2 Approaches (Remove It From Client) Or (Invalid That Jwt)
    //We Will Use Removing It From The Client
    res.cookie("jwt", "");
    res.status(200).json({
        statusCode:202,
        message:"You Logged Out"
    });

});

//Authentication

exports.protectRoute = catchAsync(async (req, res, next) => {
    const token =  req.cookies.jwt;
    if (!token) return next("Please Sign In");
    const tokenVeri = await authTools.tokenVerify(token); 
    if (!tokenVeri) return next("Please Sign In Again");
    const user = await userModel.find({pid:tokenVeri.id});
    if (!user) return next("Please sign in again error token is invalid", 404)
    req.user = user;
    next();
 });
 
//Authorization
exports.restrictedTo = (...roles) => {

    return (req, res, next) => {
       const role = req.user.role;
       if (!req.user) return next("Please Login To Join This Route As it has restrictions");
       if (!roles.includes(role)) return next("You are not authorized to enter that route");
       next();
 
    }
 }