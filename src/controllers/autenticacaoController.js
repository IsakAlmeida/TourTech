var autenticacaoModel = require("../models/autenticacaoModel");

function logar(req, res) {
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;

    if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está indefinida!");
    } else {

        autenticacaoModel.logar(email, senha)
            .then(
                function (resultadoLogar) {
                    console.log(`\nResultados encontrados: ${resultadoLogar.length}`);
                    console.log(`Resultados: ${JSON.stringify(resultadoLogar)}`); // transforma JSON em String

                    if (resultadoLogar.length == 1) {
                        res.send(resultadoLogar);
                        console.log(resultadoLogar);
                    } else if (resultadoLogar.length == 0) {
                        res.status(403).send("Email e/ou senha inválido(s)");
                    } else {
                        res.status(403).send("Mais de um usuário com o mesmo login e senha!");
                    }
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log("\nHouve um erro ao realizar o login! Erro: ", erro.sqlMessage);
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }

}

function cadastrar(req, res) {
    // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
    var nome = req.body.nomeServer;
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;
    var fkEmpresa = req.body.empresaServer;
    var fkNivelAcesso = req.body.nivelAcessoServer;

    // Faça as validações dos valores
    if (nome == undefined) {
        res.status(400).send("Seu nome está undefined!");
    } else if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está undefined!");
    } else if (fkEmpresa == undefined) {
        res.status(400).send("Sua empresa a vincular está undefined!");
    } else if (fkNivelAcesso == undefined) {
        res.status(400).send("Seu nível de acesso está undefined!")
    } else {
        // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
        autenticacaoModel.cadastrar(nome, email, senha, fkEmpresa, fkNivelAcesso)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar o cadastro! Erro: ",
                        erro.sqlMessage
                    );
                    if (erro.code == "ER_DUP_ENTRY") {
                        res.status(409).send("Email duplicado");
                    } else {
                        res.status(500).json(erro.sqlMessage);
                    }
                }
            );
    }
}

function verificarToken(req, res) {
    var codigoToken = req.body.tokenServer;
    if (codigoToken == undefined) res.status(400).send("Seu token está undefined!");
    else {
        autenticacaoModel.verificarToken(codigoToken)
            .then(
                function (resultadoToken) {
                    if (resultadoToken.length == 1) {
                        res.send(resultadoToken);
                        console.log(resultadoToken);
                    } else if (resultadoToken.length == 0) {
                        res.status(403).send("Token inválido");
                    }
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro no token! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            )
    }
}

module.exports = {
    logar,
    cadastrar,
    verificarToken
}