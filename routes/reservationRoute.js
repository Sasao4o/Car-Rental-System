const express = require("express");
const router = express.Router();
const reservationController = require("../controller/reservationController");
router.post("/:id/reserve", reservationController.terminateReservation)
router.post("/", reservationController.addReservation)
module.exports = router;
