var express = require("express");
var router = express.Router();

var pacoteController = require("../controllers/pacoteController");

//listar pacotes
router.get("/listarPacotes", function(req, res) {
    pacoteController.listarPacotes(req, res);
});

// listar municipio
router.get("/listarMunicipio", function (req, res){
    pacoteController.listarMunicipio(req, res);
});

router.get("/listarHospedagem", function (req, res){
    pacoteController.listarHospedagem(req, res);
});

router.get("/listarAlimentacao", function (req, res){
    pacoteController.listarAlimentacao(req, res);
});

//cadastrar pacotes
router.post("/cadastrar", function (req, res){
    pacoteController.cadastrar(req, res);
});

//buscar pacotes
router.get("/buscar", function(req, res){
    pacoteController.buscar(req, res);
});

//atualizar pacotes
router.put("/atualizar", function(req, res){
    pacoteController.atualizar(req, res);
})

//deletar pacotes
router.delete("/deletar", function(req, res){
    pacoteController.deletar(req, res);
});

module.exports = router;