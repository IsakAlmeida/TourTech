var estabelecimentoModel = require("../models/estabelecimentoModel");

function listar(req, res) {

    var limite = Number(req.query.limite) || 10;
    var pagina = Number(req.query.pagina) || 1;
    var busca = req.query.busca || "";

    var offset = (pagina - 1) * limite;

    Promise.all([
        estabelecimentoModel.listar(limite, offset, busca),
        estabelecimentoModel.contar(busca)
    ])
    .then(([dados, totalResult]) => {

        var total = totalResult[0].total;

        res.status(200).json({
            dados,
            total,
            pagina,
            limite
        });
    })
    .catch(function (erro) {
        console.log(erro);
        res.status(500).json(erro);
    });
}

function cadastrar(req, res) {

    var { tipo, nome, categoria, endereco, multilingue, contato, emailComercial, fkMunicipio } = req.body;

    if (!tipo || !nome || !categoria || !endereco || !multilingue || !contato || !emailComercial || !fkMunicipio) {
        return res.status(400).json({ erro: "Todos os campos são obrigatórios" });
    }

    estabelecimentoModel.cadastrar(tipo, nome, categoria, endereco, multilingue, contato, emailComercial, fkMunicipio)
        .then(resultado => res.status(201).json(resultado))
        .catch(erro => res.status(500).json(erro));
}

function listarMunicipio(req, res) {
    estabelecimentoModel.listarMunicipio()
        .then(resultado => res.json(resultado))
        .catch(erro => res.status(500).json(erro));
}

function buscarEstabelecimento(req, res) {
    var { id, tipo } = req.params;

    estabelecimentoModel.buscarEstabelecimento(id, tipo)
        .then(resultado => res.json(resultado))
        .catch(erro => res.status(500).json(erro));
}

function atualizar(req, res) {

    var { id, tipo, nome, categoria, endereco, multilingue, contato, emailComercial, fkMunicipio } = req.body;

    estabelecimentoModel.atualizar(id, tipo, nome, categoria, endereco, multilingue, contato, emailComercial, fkMunicipio)
        .then(resultado => res.json(resultado))
        .catch(erro => res.status(500).json(erro));
}

function deletar(req, res) {

    var { id, tipo } = req.body;

    estabelecimentoModel.deletar(id, tipo)
        .then(resultado => res.json(resultado))
        .catch(erro => res.status(500).json(erro));
}

module.exports = {
    listar,
    cadastrar,
    listarMunicipio,
    buscarEstabelecimento,
    atualizar,
    deletar
};