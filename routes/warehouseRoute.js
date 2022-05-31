const express = require("express");
const router = express.Router();
const warehouseController = require("../controller/warehouseController");
 
router.get("/", warehouseController.getAllWH);

module.exports = router;