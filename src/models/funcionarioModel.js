var database = require("../database/config");

// Listar Funcionario 
function listar(id_empresa) {
    var instrucaoSql = `
        SELECT 
            idUsuario,
            nome,
            email,
            fkEmpresa,
            fkNivelAcesso
        FROM usuario
        WHERE fkEmpresa = ${id_empresa};
    `;

    console.log("Executando SQL:\n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

// Nivel Acesso
function buscarNiveisAcesso(id_empresa, id_usuario) {
    var instrucaoSql = `
        SELECT 
            na.nivel
        FROM usuario u
        JOIN nivelAcesso na 
            ON u.fkNivelAcesso = na.idNivelAcesso
        WHERE u.fkEmpresa = ${id_empresa}
        AND u.idUsuario = ${id_usuario};
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
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


// Atualizar
function atualizar(id_usuario, id_empresa, senha) {
    var instrucaoSql = `
        UPDATE usuario SET senha = '${senha}'
        WHERE idUsuario = ${id_usuario}
        AND fkEmpresa = ${id_empresa};
    `;
    console.log("Model: Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

// Deletar
function deletar(id_usuario, id_empresa) {
    var instrucaoSql = `
        DELETE FROM usuario
        WHERE idUsuario = ${id_usuario}
        AND fkEmpresa = ${id_empresa};
    `;
    console.log("Model: Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    listar,
    buscarNiveisAcesso,
    cadastrar,
    atualizar,
    deletar
}