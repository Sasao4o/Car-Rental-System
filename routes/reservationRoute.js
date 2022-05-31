const express = require("express");
const userController = require("../controller/userController");
const router = express.Router();
const reservationController = require("../controller/reservationController");
router.post("/:id/reserve", reservationController.terminateReservation)
router.post("/",userController.protectRoute,  reservationController.addReservation);
router.get("/",userController.protectRoute, reservationController.getReservations);
router.post("/period",userController.protectRoute, reservationController.findAllRevsByPeriod);
router.post("/customer",userController.protectRoute, reservationController.findAllRevsByCus);
module.exports = router;
