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
    var nomeSocial = req.body.nomeSocial;
    var nomeFantasia = req.body.nomeFantasia;
    var cnpj = req.body.cnpj;
    var fkEmpresa = req.body.fkEmpresa;


    if (!nomeSocial || !nomeFantasia || !cnpj || !fkEmpresa) {
        return res.status(400).json({
            erro: "Controller: Todos os campos são obrigatórios"
        });
    }
    console.log("Controller: Cadastrando Estabelecimento:", { nomeSocial, nomeFantasia, cnpj, fkEmpresa });


    estabelecimentoModel.cadastrar(nomeSocial, nomeFantasia, cnpj, fkEmpresa)
        .then(function (resultado) {
            res.status(201).json({
                mensagem: "Controller: Estabelecimento cadastrado com sucesso", resultado
            });
        })
        .catch(function (erro) {
            console.log(erro);

            if (erro.code == "ER_DUP_ENTRY") {
                res.status(409).send("CNPJ duplicado");
            } else {
                res.status(500).send("Erro no servidor");
            }
        });
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


// Deletar usuario
function deletar(req, res) {
    var cnpj = req.body.cnpj;
    var id_empresa = req.body.idEmpresa;

    estabelecimentoModel.deletar(cnpj, id_empresa)
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
    atualizar,
    deletar
};