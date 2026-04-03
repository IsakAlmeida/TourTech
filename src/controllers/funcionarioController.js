var funcionarioModel = require("../models/funcionarioModel");

// Listar Funcionario
function listar(req, res) {
    let id_empresa = req.params.id_empresa

    funcionarioModel.listar(id_empresa).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Controller: Nenhum funcionario encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Controller: Houve um erro ao buscar os funcionários: ", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}


// Cadastrar Funcionario
function cadastrar(req, res) {
    var nome = req.body.nome;
    var sobrenome = req.body.sobrenome;
    var email = req.body.email;
    var senha = req.body.senha;
    var fkEmpresa = req.body.fkEmpresa;

    var nomeCompleto = nome + " " + sobrenome;

    if (!nome || !sobrenome || !email || !senha || !fkNivelAcesso || !fkEmpresa) {
        return res.status(400).json({
            erro: "Controller: Todos os campos são obrigatórios"
        });
    }
    console.log("Controller: Cadastrando funcionário:", { nomeCompleto, email, senha, fkNivelAcesso, fkEmpresa });


    funcionarioModel.cadastrar(nomeCompleto, email, senha, fkNivelAcesso, fkEmpresa)
        .then(function (resultado) {
            res.status(201).json({
                mensagem: "Controller: Funcionário cadastrado com sucesso", resultado
            });
        })
        .catch(function (erro) {
            console.log("Controller: Erro ao cadastrar funcionário:", erro);
            res.status(500).json({
                erro: "Controller: Erro interno ao cadastrar funcionário"
            });
        });
}


// Niveis
function listarNiveis(req, res) {
    funcionarioModel.listarNiveis()
    .then(function (resultado) {
            res.status(200).json({
                mensagem: "Controller: Nivel listado com sucesso", resultado
            });
        })
        .catch(
            function (erro) {
                console.log(erro);
                console.log("Controller: Houve um erro ao listar os niveis: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        );
}


// Atualizar Senha
function atualizar(req, res) {
    var id_usuario = req.body.idUsuario;
    var id_empresa = req.body.idEmpresa;
    var senha = req.body.senha;

    funcionarioModel.atualizar(id_usuario, id_empresa, senha)
        .then(function (resultado) {
            res.status(200).json({
                mensagem: "Controller: Atualizado com sucesso", resultado
            });
        })
        .catch(
            function (erro) {
                console.log(erro);
                console.log("Controller: Houve um erro ao atualizar o perfil: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        );
}


// Deletar usuario
function deletar(req, res) {
    var id_usuario = req.body.idUsuario;
    var id_empresa = req.body.idEmpresa;

    funcionarioModel.deletar(id_usuario, id_empresa)
        .then(function (resultado) {
            res.status(200).json({
                mensagem: "Controller: Deletado com sucesso", resultado

            });
        })
        .catch(
            function (erro) {
                console.log(erro);
                console.log("Controller: Houve um erro ao deletar o perfil: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        );
}



module.exports = {
    listar,
    cadastrar,
    listarNiveis,
    atualizar,
    deletar
};