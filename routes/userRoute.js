const express = require("express");
const router = express.Router();
const userController = require("../controller/userController");
const carController = require("../controller/carController");
const reservationController = require("../controller/reservationController");
const clientPayCompanyController = require("../controller/clientPayCompanyController");

router.post("/signIn", userController.signIn);
router.post("/signout", userController.signOut);
router.post("/register", userController.signUp);
router.post("/Search4Car", carController.Search4Car);
router.post("/AddResrv", reservationController.AddReservation);
router.post("/ViewLatePay", clientPayCompanyController.FindLatePay);
router.post("/pay", clientPayCompanyController.insertPayment);

module.exports = router;