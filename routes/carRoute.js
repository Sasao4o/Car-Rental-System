const express = require("express");
const router = express.Router();
const carController = require("../controller/carController");

router.post("/", carController.insertCar);
router.get("/", carController.getAvailableCars);
module.exports = router;