const express = require("express");
const router = express.Router();
const cityController = require("../controller/cityController");

router.post("/", cityController.insertCity);

module.exports = router;