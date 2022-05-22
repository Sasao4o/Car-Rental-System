const express = require("express");
const router = express.Router();
const ContController = require("../controller/contractController");
router.post("/AddContract", ContController.AddContract);

router.post("/", ContController.DeleteCar);
router.post("/", ContController.DeleteCar4Sid);
router.post("/", ContController.Search4Cont);
router.post("/", ContController.Search4ContByCarId);
router.post("/", ContController.Search4ContBySid);
router.post("/", ContController.UpdateCarId);
module.exports = router;