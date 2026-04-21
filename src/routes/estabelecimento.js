var express = require("express");
var router = express.Router();

var estabelecimentoController = require("../controllers/estabelecimentoController");

router.get("/listar", function (req, res) {
    estabelecimentoController.listar(req, res);
});

router.post("/cadastrar", function (req, res) {
    estabelecimentoController.cadastrar(req, res);
});

router.get("/listarMunicipio", function (req, res){
    estabelecimentoController.listarMunicipio(req, res);
});

router.get("/buscarEstabelecimento/:id/:tipo", function (req, res) {
    estabelecimentoController.buscarEstabelecimento(req, res);
});

router.put("/atualizar", function (req, res) {
    estabelecimentoController.atualizar(req, res);
});

router.delete("/deletar", function (req, res) {
    estabelecimentoController.deletar(req, res);
});

module.exports = router;