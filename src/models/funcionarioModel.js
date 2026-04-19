var database = require("../database/config");

// Listar Funcionario 
function listar(id_usuario) {
    var instrucaoSql = `
        SELECT 
            u.idUsuario,
            u.nome,
            u.email,
            u.fkEmpresa,
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

// Niveis
function listarNiveis() {
    var instrucaoSql = `
        SELECT 
        idNivelAcesso, 
        nivel 
        FROM nivelAcesso;
    `;
    console.log("Model: Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

// Buscar
function buscarFuncionario(idUsuario) {

    var instrucao = `
            SELECT 
            u.idUsuario,
            u.nome,
            u.email,
            u.fkNivelAcesso AS idNivelAcesso
        FROM usuario u
        WHERE u.idUsuario = ${idUsuario};
    `;
    console.log("Model: Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

// Atualizar
function atualizar(idUsuario, nome, email, fkNivelAcesso, senha){
    var instrucaoSql = `
        UPDATE usuario SET
            nome = '${nome}',
            email = '${email}',
            fkNivelAcesso = ${fkNivelAcesso},
            senha = '${senha}'
        WHERE idUsuario = ${idUsuario};
    `;
    console.log("Model: Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

// Deletar
function deletar(id_usuario) {
    var deletarChamado = `
        DELETE FROM chamadoSuporte 
        WHERE fkUsuario = ${id_usuario};
    `;
    var deletarLog = `
        DELETE FROM logSistema 
        WHERE fkUsuario = ${id_usuario};
    `;
    var deletarUsuario = `
            DELETE FROM usuario 
            WHERE idUsuario = ${id_usuario};
        `
    console.log("Model: Executando a instrução  deletar chamado: \n" + deletarChamado);
    console.log("Model: Executando a instrução SQL deletar log: \n" + deletarLog);
    console.log("Model: Executando a instrução SQL deletar funcionario: \n" + deletarUsuario);
    return database.executar(deletarChamado)
        .then(() => {
            console.log("Log deletado");
            return database.executar(deletarLog);
        })
        .then(() => {
            console.log("Usuário deletado");
            return database.executar(deletarUsuario);
        });

}

module.exports = {
    listar,
    cadastrar,
    listarNiveis,
    buscarFuncionario,
    atualizar,
    deletar
}