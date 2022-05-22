const express = require("express");
const router = express.Router();
const userController = require("../controller/clientPayCompanyController");
router.post("/register", clientPayCompanyController.insertPayment);

router.post("/signIn", clientPayCompanyController.FindEmpPay);
module.exports = router;