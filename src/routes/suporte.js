var express = require("express");
var router = express.Router();

var suporteController = require("../controllers/suporteController");


router.post("/enviar", function (req, res) {
    suporteController.enviar(req, res);
});

module.exports = router;