var express = require("express");
var router = express.Router();

var autenticacaoController = require("../controllers/autenticacaoController");

//Recebendo os dados do html e direcionando para a função cadastrar de usuarioController.js
router.post("/cadastrar", function (req, res) {
    autenticacaoController.cadastrar(req, res);
})

router.post("/logar", function (req, res) {
    autenticacaoController.logar(req, res);
});


module.exports = router;