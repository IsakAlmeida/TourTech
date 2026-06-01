var express = require("express");
var router = express.Router();

var dashboardController = require("../controllers/dashboardController");

//Nacional
// KPI Estado
router.get("/kpiNacionalEstado", function (req, res) {
    dashboardController.kpiNacionalEstado(req, res);
});

//KPIPicoDemanda
router.get("/kpiModaNacional", function (req, res) {
    dashboardController.kpiModaNacional(req, res);
});

//InterNacional
// KPI Estado
router.get("/kpiInterNacionalEstado", function (req, res) {
    dashboardController.kpiInterNacionalEstado(req, res);
});

//KPIPicoDemanda
router.get("/kpiPicoDemandaInterNacional", function (req, res) {
    dashboardController.kpiPicoDemandaInterNacional(req, res);
});


//-----------------------------------------
//Nacional
// Gráfico Estado
router.get("/chartNacionalEstado", function (req, res) {
    dashboardController.chartNacionalEstado(req, res);
});


//InterNacional
// Gráfico Pais
router.get("/chartInterNacionalEstado", function (req, res) {
    dashboardController.chartInterNacionalEstado(req, res);
});

//Grafico Nacional X Internacional
router.get("/chartNacionalXInternacional", function (req, res) {
    dashboardController.chartNacionalXInternacional(req, res);
});



module.exports = router;