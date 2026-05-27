var suporteModel = require("../models/suporteModel");

function enviar(req, res) {
    var nome = req.body.nome;
    var email = req.body.email;
    var situacao = req.body.situacao;
    var descricao = req.body.descricao;
    var fkUsuario = req.body.fkUsuario;

    if (!nome ||  !email || !situacao || !descricao || !fkUsuario) {
        return res.status(400).json({
            erro: "Controller: Todos os campos são obrigatórios"
        });
    }
    console.log("Controller: enviando Suporte:", { nome, email, situacao, descricao, fkUsuario });


    suporteModel.enviar(nome, email, situacao, descricao, fkUsuario)
        .then(function (resultado) {
            res.status(201).json({
                mensagem: "Controller: Suporte enviado com sucesso", resultado
            });
        })
        .catch(function (erro) {
            console.log(erro);
            res.status(500).send("Erro no servidor");
        });
}

module.exports = {
    enviar
};