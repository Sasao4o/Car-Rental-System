const express = require("express");
const router = express.Router();
const reservationController = require("../controller/reservationController");
router.post("/register", reservationController.AddReservation);

router.post("/search", reservationController.Search4ReserveByPlate);
router.post("/", reservationController.AddReservation);
router.post("/signout", reservationController.TerminateReserve);
module.exports = router;