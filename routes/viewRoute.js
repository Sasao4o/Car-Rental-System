const express = require("express");
const router = express.Router();
const viewController = require("../controller/viewController");
const userController = require("../controller/userController");
const { route } = require("express/lib/application");
const AppError = require("../utilis/AppError");
 
router.use(userController.isLoggedIn)
router.get("/", viewController.getCars);
router.get("/login", (req, res, next) => {

            res.render("login");

});
router.get("/admin", (req, res, next) => {
    if (!req.user || req.user[0].role != "Admin") {
        return next(new AppError("Unathorized", 403));
    }
    res.render("admin");

});
router.get("/admin/addcar", (req, res, next) => {
    res.render("carmodifications");

});
router.get("/admin/modify", (req, res, next) => {
    res.render("modifystatus");

});
router.get("/reserve/:id", userController.protectRoute, (req, res, next) => {
    res.render("reserve");
});
 
router.get("/myReservation", userController.protectRoute, viewController.showDemanderReservation);
router.get("/myReservation/pay/:id", userController.protectRoute, viewController.showPaymentForm);
router.get("/signup", viewController.signUp);
router.get("/admin/search", viewController.getSearchPage);
router.get("/admin/reservations", viewController.getReservations);
router.post("/search/results", viewController.search);
router.get("/admin/reports", (req, res, next) => {
    res.render("reports");
})
router.get("/admin/reports/report1", viewController.getReport1);
router.get("/admin/reports/report2", viewController.getReport2);
router.get("/admin/reports/report3", viewController.getReport3)
router.get("/admin/reports/report4", viewController.getReport4)
router.get("/admin/reports/report5", viewController.getReport5)
 
module.exports = router;