const express = require("express");
const router = express.Router();
const carController = require("../controller/carController");

router.post("/", carController.insertCar);

module.exports = router;