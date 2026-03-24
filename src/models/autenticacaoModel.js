var database = require("../database/config")

function logar(email, senha) {
    console.log("ACESSEI O AUTENTICACAO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ", email, senha)
    var instrucaoSql = `
        SELECT idUsuario, nome, email, fkEmpresa as empresaId, n.nivel as nivelAcesso FROM usuario u JOIN nivelAcesso n ON u.fkNivelAcesso = n.idNivelAcesso WHERE email = '${email}' AND senha = '${senha}';
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

// Coloque os mesmos parâmetros aqui. Vá para a var instrucaoSql
function cadastrar(nome, email, senha, fkEmpresa, fkNivelAcesso) {
    console.log("ACESSEI O AUTENTICACAO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", nome, email, senha, fkEmpresa);

    // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
    //  e na ordem de inserção dos dados.
    var instrucaoSql = `
        INSERT INTO usuario (nome, email, senha, fkEmpresa, fkNivelAcesso) VALUES ('${nome}', '${email}', '${senha}', '${fkEmpresa}', '${fkNivelAcesso}');
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function verificarToken(codigoToken) {
    var instrucaoSql = `
    SELECT idNivelAcesso, codigoToken, fkEmpresa, nivel FROM tokenCadastro t JOIN nivelAcesso na ON t.fkNivelAcesso= na.idNivelAcesso WHERE codigoToken = '${codigoToken}';
    `;
    console.log("Executando sql para verificar codigoToken");
    return database.executar(instrucaoSql);
}

module.exports = {
    logar,
    cadastrar,
    verificarToken
};