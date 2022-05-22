const express = require("express");
const router = express.Router();
const userController = require("../controller/employeePayClientController");
router.post("/register", employeePayClientController.insertPayment);

router.post("/signIn", employeePayClientController.FindEmpPay);


module.exports = router;