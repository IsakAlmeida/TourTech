var database = require("../database/config");

// LISTAR
function listar(limite, offset, busca) {

    var filtro = busca ? `WHERE nome LIKE '%${busca}%'` : "";

    var instrucao = `
        SELECT * FROM (
            SELECT 
                idHospedagem AS id,
                nome,
                categoria,
                endereco,
                contato,
                emailComercial,
                multilingue,
                'hospedagem' AS tipo
            FROM hospedagem
            
            UNION ALL

            SELECT 
                idEstabelecimento AS id,
                nome,
                categoria,
                endereco,
                contato,
                emailComercial,
                multilingue,
                'alimenticio' AS tipo
            FROM estabelecimentoAlimenticio
        ) AS tabela
        ${filtro}
        LIMIT ${limite} OFFSET ${offset};
    `;

    return database.executar(instrucao);
}

// CONTAR
function contar(busca) {

    var filtro = busca ? `WHERE nome LIKE '%${busca}%'` : "";

    var instrucao = `
        SELECT COUNT(*) AS total FROM (
            SELECT nome FROM hospedagem
            UNION ALL
            SELECT nome FROM estabelecimentoAlimenticio
        ) AS tabela
        ${filtro};
    `;

    return database.executar(instrucao);
}

// RESTANTE
function cadastrar(tipo, nome, categoria, endereco, multilingue, contato, emailComercial, fkMunicipio) {

    var tabela = tipo == "hospedagem" ? "hospedagem" : "estabelecimentoAlimenticio";

    var instrucao = `
        INSERT INTO ${tabela}
        (nome, categoria, endereco, multilingue, contato, emailComercial, fkMunicipio)
        VALUES (
            '${nome}', '${categoria}', '${endereco}',
            ${multilingue}, '${contato}', '${emailComercial}', ${fkMunicipio}
        );
    `;

    return database.executar(instrucao);
}

function buscarEstabelecimento(id, tipo) {
    var tabela = tipo == "hospedagem" ? "hospedagem" : "estabelecimentoAlimenticio";
    var coluna = tipo == "hospedagem" ? "idHospedagem" : "idEstabelecimento";

    return database.executar(`SELECT * FROM ${tabela} WHERE ${coluna} = ${id}`);
}

function atualizar(id, tipo, nome, categoria, endereco, multilingue, contato, emailComercial, fkMunicipio) {

    var tabela = tipo == "hospedagem" ? "hospedagem" : "estabelecimentoAlimenticio";
    var coluna = tipo == "hospedagem" ? "idHospedagem" : "idEstabelecimento";

    var instrucao = `
        UPDATE ${tabela} SET
            nome='${nome}',
            categoria='${categoria}',
            endereco='${endereco}',
            multilingue=${multilingue},
            contato='${contato}',
            emailComercial='${emailComercial}',
            fkMunicipio=${fkMunicipio}
        WHERE ${coluna}=${id};
    `;

    return database.executar(instrucao);
}

function deletar(id, tipo) {
    var tabela = tipo == "hospedagem" ? "hospedagem" : "estabelecimentoAlimenticio";
    var coluna = tipo == "hospedagem" ? "idHospedagem" : "idEstabelecimento";

    return database.executar(`DELETE FROM ${tabela} WHERE ${coluna} = ${id}`);
}

function listarMunicipio() {
    return database.executar("SELECT * FROM municipio;");
}

module.exports = {
    listar,
    contar,
    cadastrar,
    listarMunicipio,
    buscarEstabelecimento,
    atualizar,
    deletar
};