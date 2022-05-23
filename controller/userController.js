const userModel = require("../model/userModel");
const demanderModel = require("../model/demanderModel");
const supplierModel = require("../model/supplierModel");

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
     user.cityId = req.body.cityId;
     user.phoneNumber =req.body.phoneNumber;
     user.visaNo=req.body.visaNo;
     const userRole = req.body.userRole.toLowerCase(); //Demander Or Supplier
     const newUser = await userModel.create(user);
     //Know Wether He is Demander Or Supplier
     /*  
        MUSTBEUPDATED 
        Transaction Should Be Used Here To ensure Both Or Nothing
     */
     if (!newUser) {
         throw new Error("Please Sign Up Again..");
     }
     if (userRole == "demander") {
      let demander = {};
      demander.person_id = newUser.insertId;
      const newDemander = await demanderModel.create(demander);
     } else if (userRole == "supplier") {
        let supplier = {};
        supplier.person_id = newUser.insertId;
        const newSupplier = await supplierModel.create(supplier);
     }
     //End Knowing
     const jwt = authTools.generateToken({username:newUser.firstname});
     res.cookie("jwt", jwt);
    res.json({
        status:200,
        message:"Success",
        jwt,
        id:newUser.insertId
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

        return next("Please Enter Correct Email And Password");
    }
   
   
    const isPasswordTrue = authTools.verifyPassword(password, currentUser.PASSWORD);
     if (!isPasswordTrue) {
        return next("Please Enter Correct Email And Password");
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
    if (!token) return next(new AppError("Please Sign In"), 404);
    const tokenVeri = await authTool.tokenVerify(token); 
    if (!tokenVeri) return next(new AppError("Please Sign In Again", 404) );
    const user = await userModel.findOne({_id: tokenVeri.id});
    if (!user) return next(new AppError("Please sign in again error token is invalid", 404))
    if (user.passwordUpdated) { 
    if (tokenVeri.iat * 1000 < user.passwordUpdatedAt) return next(new AppError("Please Sign In Again as your pw changed recently"), 404);
    }
    req.user = user;
    next();
 });

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