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
    var nome = req.body.nome;
    var categoria = req.body.categoria;
    var QtQuarto = req.body.QtQuarto;
    var fkMunicipio = req.body.fkMunicipio;
    var nota = req.body.nota;
    var precoMedio = req.body.precoMedio;


    if (!nome || !categoria || !QtQuarto || !fkMunicipio || !nota || !precoMedio) {
        return res.status(400).json({
            erro: "Controller: Todos os campos são obrigatórios"
        });
    }
    
    console.log("Controller: Cadastrando Estabelecimento:", { nome, categoria, QtQuarto, fkMunicipio, nota, precoMedio });

    estabelecimentoModel.cadastrar( nome, categoria, QtQuarto, fkMunicipio, nota, precoMedio)
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
function listarMunicipio (req, res) {
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

// Atualizar Estabelecimento
function atualizar(req, res) {
    var id_empresa = req.body.idEmpresa;
    var nomeSocial = req.body.nomeSocial;
    var nomeFantasia = req.body.nomeFantasia;
    var cnpj = req.body.cnpj;

    estabelecimentoModel.atualizar(id_empresa, nomeSocial, nomeFantasia, cnpj)
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
    var id_hospedagem = req.body.idHospedagem;
     
    if (!id_hospedagem) {
        return res.status(400).send("ID não informado");
    }

    estabelecimentoModel.deletar(id_hospedagem)
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
    atualizar,
    deletar
};