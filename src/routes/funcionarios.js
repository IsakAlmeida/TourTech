var express = require("express");
var router = express.Router();

var funcionarioController = require("../controllers/funcionarioController");

// funcinario da empresa
router.get("/listar/:id_usuario", function (req, res) {
    funcionarioController.listar(req, res);
});

// cadastrar funcionario
router.post("/cadastrar", function (req, res) {
    funcionarioController.cadastrar(req, res);
});

// Nivel
router.get("/listarNiveis", function (req, res){
    funcionarioController.listarNiveis(req, res);
});

// buscar funcionario
router.get("/buscarFuncionario/:idUsuario", function (req, res) {
    funcionarioController.buscarFuncionario(req, res);
});

// atualizar
router.put("/atualizar", function (req, res) {
    funcionarioController.atualizar(req, res);
});

//deletar
router.delete("/deletar", function (req, res) {
    funcionarioController.deletar(req, res);
});

module.exports = router;