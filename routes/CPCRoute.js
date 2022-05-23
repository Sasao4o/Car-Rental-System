const express = require("express");
const router = express.Router();
const clientPayCompanyController = require("../controller/clientPayCompanyController");
router.post("/register", clientPayCompanyController.insertPayment);

router.post("/signIn", clientPayCompanyController.FindEmpPay);
module.exports = router;