const express = require("express");
const router = express.Router();
const viewController = require("../controller/viewController");


router.get("/", (req, res, next) => {
    res.render("homeUser");
});
router.get("/login", (req, res, next) => {
            res.render("login");

});
 
module.exports = router;