const { listarPacotes } = require("../controllers/pacoteController");
var database = require("../database/config");

// Listar pacotes
function listarPacotes() {
    var instrucaoSql = `SELECT
	p.idPacote,
	p.nome as nomePacote,
	m.nome as municipio,
	h.nome as hospedagem,
	e.estabelecimento as estabelecimento
	FROM pacote p
	JOIN municipio m
	ON p.fkMunicipio = m.idMunicipio
	JOIN hospedagem h
	ON p.fkHospedagem = h.idHospedagem
	JOIN estabelecimentoAlimenticio e
	ON p.fkEstabelecimento = e.idEstabelecimento
	ORDER BY p.idPacote;`;

    console.log("Executando SQL:\n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

//Listar municípios
function listarMunicipio() {
    var instrucaoSql = `SELECT m.idMunicipio,
    m.nome as municipio
    FROM municipio m
    ORDER BY m.nome;`;

    console.log("Executando SQL:\n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

//Listar hospedagens
function listarHospedagem() {
    var instrucaoSql = `SELECT h.idHospedagem,
    h.nome as hospedagem
    FROM hospedagem h
    ORDER BY h.nome;`;

    console.log("Executando SQL:\n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

//Listar Alimentícios
function listarAlimentacao() {
    var instrucaoSql = `SELECT e.idEstabelecimento,
    e.nome as estabelecimento
    FROM estabelecimentoAlimenticio e
    ORDER BY e.nome;`;

    console.log("Executando SQL:\n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

//Cadastrar pacote
function cadastrar(nome, fkMunicipio, fkHospedagem, fkEstabelecimento, atrativos = []) {
    var instrucaoSql = `INSERT INTO pacote (nome, fkMunicipio, fkHospedagem, fkEstabelecimento) VALUES (
    ${nome},
    ${fkMunicipio},
    ${fkHospedagem},
    ${fkEstabelecimento}
    );`;

    console.log("Executando SQL:\n" + instrucaoSql);

    return database.executar(instrucaoSql)
        .then(resultado => {
            var idPacote = resultado.insertId;

            if (!atrativos.length) {
                return resultado;
            }

            var promessas = atrativos.map(idAtrativo => {
                var sqlAtrativo = `INSERT INTO pacote_atrativo (pacote_id, atrativo_id) VALUES (${idPacote}, ${idAtrativo});`;
                console.log("Executando SQL:\n" + sqlAtrativo);
                return database.executar(sqlAtrativo);
            });

            return Promise.all(promessas);
        });
}

// Buscar
function buscar(idPacote) {
    var instrucaoSql = `SELECT 
    p.idPacote,
    p.nome,
    p.fkMunicipio,
    p.fkHospedagem,
    p.fkEstabelecimento
    FROM pacote p
    WHERE p.idPacote = ${idPacote};`;

    console.log("Model: Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

// Atualizar
function atualizar(idPacote, nome, fkMunicipio, fkHospedagem, fkEstabelecimento) {

    var instrucaoSql = `UPDATE pacote SET
    nome = ${nome},
    fkMunicipio = ${fkMunicipio},
    fkHospedagem = ${fkHospedagem},
    fkEstabelecimento = ${fkEstabelecimento}
	WHERE idPacote = ${idPacote};`;

    console.log("Model: Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

// Deletar
function deletar(idPacote) {
    var instrucaoSqlRelacionamentos = `DELETE FROM pacote_atrativo WHERE pacote_id = ${idPacote};`;

    var instrucaoSqlPacote = `DELETE FROM pacote WHERE idPacote = ${idPacote};`;

    console.log("Model: Executando a instrução SQL: \n" + instrucaoSqlRelacionamentos);
    console.log("Model: Executando a instrução SQL: \n" + instrucaoSqlPacote);
    return database.executar(instrucaoSqlRelacionamentos)
        .then(() => database.executar(instrucaoSqlPacote));
}

module.exports = {
    listarPacotes,
    listarMunicipio,
    listarHospedagem,
    listarAlimentacao,
    cadastrar,
    buscar,
    atualizar,
    deletar
}