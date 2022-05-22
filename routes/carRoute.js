const express = require("express");
const router = express.Router();
const carController = require("../controller/carController");

router.post("/InsertCar", carController.insertCar);
router.post("/Search4Car", carController.Search4Car);
router.post("/DeleteCar", carController.DeleteCar);

module.exports = router;