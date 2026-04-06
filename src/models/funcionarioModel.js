var database = require("../database/config");

// Listar Funcionario 
function listar(id_usuario) {
    var instrucaoSql = `
        SELECT 
            u.idUsuario,
            u.nome,
            u.email,
			na.nivel
        FROM usuario u
        JOIN nivelAcesso na 
            ON u.fkNivelAcesso = na.idNivelAcesso
            JOIN usuario f
            ON u.fkEmpresa = f.fkEmpresa 
        WHERE f.idUsuario = ${id_usuario};
    `;

    console.log("Executando SQL:\n" + instrucaoSql);
    return database.executar(instrucaoSql);
}


// Cadastrar Funcionario
function cadastrar(nome, email, senha, fkNivelAcesso, fkEmpresa) {
    var instrucao = `
        INSERT INTO usuario (
            nome,
            email,
            senha,
            fkNivelAcesso,
            fkEmpresa
        ) VALUES (
            '${nome}',
            '${email}',
            '${senha}',
            ${fkNivelAcesso},
            ${fkEmpresa}
        );
    `;

    console.log("Model: Executando SQL:", instrucao);

    return database.executar(instrucao);
}


function listarNiveis() {
    var instrucaoSql = `
        SELECT idNivelAcesso, nivel FROM nivelAcesso;
    `;
    console.log("Model: Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

// Atualizar
function atualizar(id_usuario, senha) {
    var instrucaoSql = `
        UPDATE usuario SET senha = '${senha}'
        WHERE idUsuario = ${id_usuario};
    `;
    console.log("Model: Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

// Deletar
function deletar(id_usuario) {
    var instrucaoSql = `
        DELETE FROM usuario
        WHERE idUsuario = ${id_usuario};
    `;
    console.log("Model: Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    listar,
    cadastrar,
    listarNiveis,
    atualizar,
    deletar
}