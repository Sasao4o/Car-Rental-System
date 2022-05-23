const express = require("express");
const router = express.Router();
const userController = require("../controller/userController");
const carController = require("../controller/carController");
const reservationController = require("../controller/reservationController");
const clientPayCompanyController = require("../controller/clientPayCompanyController");

router.post("/signIn", userController.signIn);
router.post("/signout", userController.signOut);
router.post("/register", userController.signUp); //FOR INSERTING EMPLOYEES
router.post("/Search4Car", carController.Search4Car);
router.post("/InsertCar", carController.insertCar);
router.post("/UpdateCar", carController.UpdateCar);
router.post("/ViewResrvByPer", reservationController.findAllRevsByPeriod);// report
router.post("/ViewPay", userController.findAllPayByPeriod); //report
router.post("/ViewResrvByCus", reservationController.findAllRevsByCus); //report
router.post("/ViewStat", carController.ViewStat); //report
// router.post("/register", clientPayCompanyController.insertPayment);




module.exports = router;