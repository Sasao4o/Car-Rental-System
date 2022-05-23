const express = require("express");
const router = express.Router();
const reservationController = require("../controller/reservationController");
router.post("/AddResrv", reservationController.AddReservation);

router.post("/search", reservationController.Search4ReserveByPlate);
router.post("/KillReserve", reservationController.TerminateReserve);
module.exports = router;