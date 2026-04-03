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


// Nivel Acesso
function buscarNiveisAcesso(req, res) {
    let id_empresa = req.body.id_empresa
    let id_funcionario = req.body.id_funcionario

    funcionarioModel.buscarNiveisAcesso(id_empresa, id_funcionario).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Controller: Nenhum nível de acesso encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Controller: Houve um erro ao buscar os níveis de acesso: ", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}


// Cadastrar Funcionario
function cadastrar(req, res) {
    var nome = req.body.nome;
    var sobrenome = req.body.sobrenome;
    var email = req.body.email;
    var telefone = req.body.telefone;
    var senha = req.body.senha;
    var fkEmpresa = req.body.fkEmpresa;

    if (!nome || !sobrenome || !email || !telefone || !senha || !fkEmpresa) {
        return res.status(400).json({
            erro: "Controller: Todos os campos são obrigatórios"
        });
    }
    console.log("Cadastrando funcionário:", { nome, sobrenome, email, telefone, senha, fkEmpresa });


    funcionarioModel.cadastrar(nome, sobrenome, email, telefone, senha, fkEmpresa)
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


// Cadastrar nivel de acesso
function cadastrarAcessoFuncionario(req, res) {
    var fkFuncionario = req.body.id_funcionario;
    var fkEmpresa = req.body.id_empresa;
    var fkNivelAcesso = req.body.id_nivel_acesso;

    funcionarioModel.cadastrarAcessoFuncionario(fkFuncionario, fkEmpresa, fkNivelAcesso)
        .then(function (resultado) {
            res.status(201).json({ mensagem: "Controller: Nível de acesso do funcionário cadastrado com sucesso", resultado });
        })
        .catch(function (erro) {
            console.error("Controller: Erro ao cadastrar nível de acesso do funcionário:", erro);
            res.status(500).json({
                erro: "Controller: Erro interno ao cadastrar nível de acesso do funcionário"
            });
        });
}

// Atualizar
function atualizar(req, res) {
    var id_funcionario = req.body.idFuncionarioServer
    var id_empresa = req.body.idEmpresaServer
    var senha = req.body.senhaServer

    funcionarioModel.atualizar(id_funcionario, id_empresa, senha)
        .then(function (resultado) {
            res.status(200).json({
                mensagem: "Atualizado com sucesso", resultado
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


module.exports = {
    listar,
    buscarNiveisAcesso,
    cadastrar,
    cadastrarAcessoFuncionario,
    atualizar
};