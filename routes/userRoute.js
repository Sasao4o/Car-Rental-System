const express = require("express");
const router = express.Router();
const userController = require("../controller/userController");
router.post("/register", userController.signUp);

router.post("/", userController.signIn);
router.post("/signout", userController.signOut);

module.exports = router;