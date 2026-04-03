var express = require("express");
var router = express.Router();

var funcionarioController = require("../controllers/funcionarioController");

// funcinario da empresa
router.get("/listar/:idEmpresa", function (req, res) {
    funcionarioController.listar(req, res);
});

// nivel funcionario
router.get("/nivelAcesso", function (req, res) {
    funcionarioController.buscarNiveisAcesso(req, res);
});

// cadastrar funcionario
router.post("/cadastrar", function (req, res) {
    funcionarioController.cadastrar(req, res);
});

// nivel de acesso
router.post("/acessoFuncionario", function (req, res) {
    funcionarioController.cadastrarAcessoFuncionario(req, res);
});

// atualizar
router.put("/atualizar", function (req, res) {
    funcionarioController.atualizar(req, res);
});

module.exports = router;