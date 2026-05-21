var database = require("../database/config");

// Listar Funcionario 
function kpiModaNacional() {
    var instrucaoSql = `SELECT nomeMes FROM tempo GROUP BY nomeMes ORDER BY COUNT(*) DESC LIMIT 1;`;

    console.log("Executando SQL:\n" + instrucaoSql);
    return database.executar(instrucaoSql);
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


module.exports = {
    kpiModaNacional,
    listarNiveis
}