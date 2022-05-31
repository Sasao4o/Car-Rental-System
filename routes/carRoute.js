const express = require("express");
const router = express.Router();
const carController = require("../controller/carController");
//test
const userController = require("../controller/userController");
//end test


router.post("/update", carController.updateCarStatus);
router.post("/", carController.insertCar);
router.get("/", carController.getAvailableCars);
router.post("/period", carController.getCarByPeriod);
router.post("/status/period", carController.ViewStat);
module.exports = router;