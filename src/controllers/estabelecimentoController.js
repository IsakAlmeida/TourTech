var estabelecimentoModel = require("../models/estabelecimentoModel");

// Listar estabelecimento
function listar(req, res) {
    estabelecimentoModel.listar()
        .then(function (resultado) {
            if (resultado.length > 0) {
                res.status(200).json(resultado);
            } else {
                res.status(204).send("Controller: Nenhum Estabelecimento encontrado!")
            }
        }).catch(function (erro) {
            console.log(erro);
            console.log("Controller: Houve um erro ao buscar Estabelecimento: ", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        });
}


// Cadastrar Estabelecimento
function cadastrar(req, res) {
    var tipo = req.body.tipo;
    var nome = req.body.nome;
    var categoria = req.body.categoria;
    var endereco = req.body.endereco;
    var multilingue = req.body.multilingue;
    var contato = req.body.contato;
    var emailComercial = req.body.emailComercial;
    var fkMunicipio = req.body.fkMunicipio;


    if (!tipo || !nome || !categoria || !endereco || !multilingue || !contato || !emailComercial || !fkMunicipio) {
        return res.status(400).json({
            erro: "Controller: Todos os campos são obrigatórios"
        });
    }

    console.log("Controller: Cadastrando Estabelecimento:", {tipo, nome, categoria, endereco, multilingue, contato, emailComercial, fkMunicipio});

    estabelecimentoModel.cadastrar(tipo, nome, categoria, endereco, multilingue, contato, emailComercial, fkMunicipio)
        .then(function (resultado) {
            res.status(201).json({
                mensagem: "Controller: Estabelecimento cadastrado com sucesso", resultado
            });
        })
        .catch(function (erro) {
            console.log(erro);
            res.status(500).send("Erro no servidor");

        });
}

// Municipio
function listarMunicipio(req, res) {
    estabelecimentoModel.listarMunicipio()
        .then(function (resultado) {
            console.log("Controller: Municipio listado com sucesso ", resultado);
            res.status(200).json(resultado);
        })
        .catch(
            function (erro) {
                console.log(erro);
                console.log("Controller: Houve um erro ao listar Municipio: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        );
}

// Buscar Estabelecimento
function buscarEstabelecimento(req, res) {
    var id = req.params.id;
    var tipo = req.params.tipo;

    estabelecimentoModel.buscarEstabelecimento(id, tipo)
        .then(function (resultado) {
            console.log("Controller: Estabelecimento buscado com sucesso ", resultado);
            res.status(200).json(resultado);
        })
        .catch(function (erro) {
            console.log(erro);
            res.status(500).send("Erro no servidor buscar estabelecimento");

        });
}

// Atualizar Estabelecimento
function atualizar(req, res) {
    var id = req.body.id;
    var tipo = req.body.tipo;
    var nome = req.body.nome;
    var categoria = req.body.categoria;
    var endereco = req.body.endereco;
    var multilingue = req.body.multilingue;
    var contato = req.body.contato;
    var emailComercial = req.body.emailComercial;
    var fkMunicipio = req.body.fkMunicipio;

    if (!id || !tipo || !nome || !categoria || !endereco || !multilingue || !contato || !emailComercial || !fkMunicipio) {
        return res.status(400).json({
            erro: "Controller: Todos os campos para atualização são obrigatórios"
        });
    }

    estabelecimentoModel.atualizar(id, tipo, nome, categoria, endereco, multilingue, contato, emailComercial, fkMunicipio)
        .then(function (resultado) {
            res.status(200).json({
                mensagem: "Controller: Atualizado com sucesso", resultado
            });
        })
        .catch(
            function (erro) {
                console.log(erro);
                console.log("Controller: Houve um erro ao atualizar o Estabelecimento: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        );
}


// Deletar Estabelecimento
function deletar(req, res) {
    var id = req.body.id;
    var tipo = req.body.tipo;

    if (!id || !tipo) {
        return res.status(400).send("ID e Tipo não informado");
    }

    estabelecimentoModel.deletar(id, tipo)
        .then(function (resultado) {
            res.status(200).json({
                mensagem: "Controller: Deletado com sucesso", resultado

            });
        })
        .catch(
            function (erro) {
                console.log(erro);
                console.log("Controller: Houve um erro ao deletar o Estabelecimento: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        );
}



module.exports = {
    listar,
    cadastrar,
    listarMunicipio,
    buscarEstabelecimento,
    atualizar,
    deletar
};