const express = require("express");
const router = express.Router();
const userController = require("../controller/userController");
router.post("/register", userController.signUp);

router.post("/", userController.signIn);
router.post("/dailypayment", userController.findAllPayByPeriod);
router.post("/signout", userController.signOut);
router.get("/demanderId", userController.protectRoute,  userController.getDemanderId);
module.exports = router;