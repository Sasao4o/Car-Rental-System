const express = require("express");
const router = express.Router();
const ContController = require("../controller/contractController");
router.post("/AddContract", ContController.AddContract);

router.post("/DC", ContController.DeleteCar);
router.post("/DC4S", ContController.DeleteCar4Sid);
router.post("/search", ContController.Search4Cont);
router.post("/searchBcar", ContController.Search4ContByCarId);
router.post("/searchBS", ContController.Search4ContBySid);
router.post("/U", ContController.UpdateCarId);
module.exports = router;