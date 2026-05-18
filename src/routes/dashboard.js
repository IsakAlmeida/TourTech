var express = require("express");
var router = express.Router();

var dashboardController = require("../controllers/dashboardController");

// Dashboard get
router.get("/kpiModaNacional", function (req, res) {
    dashboardController.kpiModaNacional(req, res);
});


module.exports = router;