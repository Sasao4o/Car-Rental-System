const express = require("express");
const router = express.Router();
const carController = require("../controller/carController");
//test
const userController = require("../controller/userController");
//end test

router.post("/", carController.insertCar);
router.get("/", carController.getAvailableCars);
module.exports = router;