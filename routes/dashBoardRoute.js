const express = require("express");
const router = express.Router();
const dashBoardController = require("../controller/dashBoardController");
router.post("/hire", dashBoardController.hireEmployee);
module.exports = router;
