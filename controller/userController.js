const userModel = require("../model/userModel");
const demanderModel = require("../model/demanderModel");
const supplierModel = require("../model/supplierModel");

const AppError = require("../utilis/AppError");
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
    
     const oldEmail = await userModel.find({email:user.email});
     if (oldEmail.length != 0) {
         return next(new AppError("This Email Already Exists"));
     }
    // const userRole = req.body.userRole.toLowerCase(); //Demander Or Supplier
    const userRole = "demander"
     const newUser = await userModel.create(user);
     //Know Wether He is Demander Or Supplier
     /*  
        MUSTBEUPDATED 
        Transaction Should Be Used Here To ensure Both Or Nothing
     */
     if (!newUser) {
         throw new Error("Please Sign Up Again..");
     }
     //MUSTBEUPDATED 1 DE 3MAl ma n7ot l supplier
     if (1 || userRole == "demander") {
      let demander = {};
      demander.person_id = newUser.insertId;
      const newDemander = await demanderModel.create(demander);
     } else if (userRole == "supplier") {
        let supplier = {};
        supplier.person_id = newUser.insertId;
        const newSupplier = await supplierModel.create(supplier);
     }
     //End Knowing
  
     const jwt = authTools.generateToken({id:newUser.insertId});
     res.cookie("jwt", jwt);
    res.json({
        status:"success",
        message:"Success",
        jwt,
        id:newUser.insertId
    });

});

exports.signIn = catchAsync(async function(req, res, next) {
    const email = req.body.email;
    const password = req.body.password;
    const role = req.body.role;
     
    if (!email || !password || !role) {
       return next(new AppError("Please Enter Your Email and Password", "401"));
    }
    const user = await userModel.find({email, role});
     
    const currentUser = user[0];
    if (!currentUser) {

        return next(new AppError("Please Enter correct Email and Password", "401"));
    }
   
   
    const isPasswordTrue = authTools.verifyPassword(password, currentUser.PASSWORD);
     if (!isPasswordTrue) {
        return next(new AppError("Please Enter correct Email and Password", "401"));
     }
     const jwt = authTools.generateToken({id:currentUser.pid});
     res.cookie("jwt", jwt);
 
    res.json({
        status:"success",
        jwt
    });
  
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
   
    if (user.length == 0) return next("Please sign in again error token is invalid", 404)
    req.user = user[0];
  
    res.locals.user = user;
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
 exports.isLoggedIn = catchAsync(async (req, res, next) => {
    const token =  req.cookies.jwt;
    if (!token) return next();
    const tokenVeri = await authTools.tokenVerify(token); 
    if (!tokenVeri) return next();
    const user = await userModel.find({pid:tokenVeri.id});
    if (!user) return next();
    req.user = user;
    res.locals.user = user;
     
    next();
 });
 exports.findAllPayByPeriod = catchAsync(async function (req, res, next) {
  
   
    var start_date=req.body.start_date;
    var end_date=req.body.end_date;
     const payment = await userModel.findPayByPeriod(start_date,end_date);
     res.status(202).json({
         statusCode:202,
         message:"sucess",
         payment
    
     });
 
 
 
 
 
 });

 exports.getDemanderId = catchAsync(async (req, res, next) => {
    const user = req.user;
    let userId=user.pid;
 
    const demander = await demanderModel.find({pid:userId});
    console.log(demander);
    res.json({
        status:"success",
        id:demander[0].Did
    })
    
 });