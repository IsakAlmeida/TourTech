var express = require("express");
var router = express.Router();

var estabelecimentoController = require("../controllers/estabelecimentoController");

// estabelecimento da empresa
router.get("/listar", function (req, res) {
    estabelecimentoController.listar(req, res);
});

// cadastrar estabelecimento
router.post("/cadastrar", function (req, res) {
    estabelecimentoController.cadastrar(req, res);
});

// listar municipio
router.get("/listarMunicipio", function (req, res){
    estabelecimentoController.listarMunicipio(req, res);
});

// buscar Estabeçecimento
router.get("/buscarEstabelecimento/:id/:tipo", function (req, res) {
    estabelecimentoController.buscarEstabelecimento(req, res);
});

// atualizar
router.put("/atualizar", function (req, res) {
    estabelecimentoController.atualizar(req, res);
});

//deletar
router.delete("/deletar", function (req, res) {
    estabelecimentoController.deletar(req, res);
});

module.exports = router;