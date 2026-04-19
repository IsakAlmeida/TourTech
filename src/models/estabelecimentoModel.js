var database = require("../database/config");

// Listar Estabelecimento 
function listar() {
    var instrucao = `
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
        FROM estabelecimentoAlimenticio;

    `;

    console.log("Model: Executando LISTAGEM SQL:\n" + instrucao);
    return database.executar(instrucao);
}


// Cadastrar Estabelecimento
function cadastrar(tipo, nome, categoria, endereco, multilingue, contato, emailComercial, fkMunicipio) {
    if (tipo == "hospedagem") {
        var instrucaoSql = `
        INSERT INTO hospedagem (
        nome,
        categoria, 
        endereco,
        multilingue, 
        contato, 
        emailComercial, 
        fkMunicipio)
            VALUES(
            '${nome}', 
            '${categoria}', 
            '${endereco}', 
            ${multilingue}, 
            '${contato}', 
            '${emailComercial}', 
            ${fkMunicipio}
        );
    `;
    } else {
        var instrucaoSql = `
            INSERT INTO estabelecimentoAlimenticio (
            nome,
            categoria, 
            endereco,
            multilingue, 
            contato, 
            emailComercial, 
            fkMunicipio)
                VALUES(
            '${nome}', 
            '${categoria}', 
            '${endereco}', 
            ${multilingue}, 
            '${contato}', 
            '${emailComercial}', 
            ${fkMunicipio}
        );
    `;
    }

    console.log("Model: Executando CADASTRO SQL:\n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

// Municipio
function listarMunicipio() {
    var instrucao = `
        SELECT 
        idMunicipio, 
        nome 
        FROM municipio;
    `;
    console.log("Model: Executando Listagem MUNICIPIO SQL: \n" + instrucao);
    return database.executar(instrucao);
}

// Buscar
function buscarEstabelecimento(id, tipo) {
    if (tipo == "hospedagem") {
        var instrucao = `
          SELECT 
            h.idHospedagem,
            h.nome,
            h.categoria,
            h.endereco,
            h.multilingue,
            h.contato,
            h.emailComercial,
            m.idMunicipio
        FROM hospedagem h
        JOIN municipio m
        ON m.idMunicipio = h.fkMunicipio
        WHERE h.idHospedagem = ${id};
    `;
    } else {
        var instrucao = `
          SELECT 
            e.idEstabelecimento,
            e.nome,
            e.categoria,
            e.endereco,
            e.multilingue,
            e.contato,
            e.emailComercial,
            m.idMunicipio
        FROM estabelecimentoAlimenticio e
        JOIN municipio m
        ON m.idMunicipio = e.fkMunicipio
        WHERE e.idEstabelecimento = ${id};
    `;
    }
    console.log("Model: Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

// Atualizar
function atualizar(id, tipo, nome, categoria, endereco, multilingue, contato, emailComercial, fkMunicipio) {
    if (tipo == "hospedagem") {
        var instrucaoSql = `
        UPDATE hospedagem SET
          nome='${nome}',
                categoria='${categoria}',
                endereco='${endereco}',
                multilingue=${multilingue},
                contato='${contato}',
                emailComercial='${emailComercial}',
                fkMunicipio=${fkMunicipio}
            WHERE idHospedagem=${id};
    `;
    } else {
        var instrucaoSql = `
        UPDATE estabelecimentoAlimenticio SET
             nome='${nome}',
                categoria='${categoria}',
                endereco='${endereco}',
                multilingue=${multilingue},
                contato='${contato}',
                emailComercial='${emailComercial}',
                fkMunicipio=${fkMunicipio}
            WHERE idEstabelecimento=${id};
    `;
    }
    console.log("Model: Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

// Deletar
function deletar(id, tipo) {
    if (tipo == "hospedagem") {
        var instrucaoSql = `
        DELETE FROM hospedagem WHERE idHospedagem = ${id};
    `;
    } else {
        var instrucaoSql = `
        DELETE FROM estabelecimentoAlimenticio WHERE idEstabelecimento = ${id};
    `;
    }

    console.log("Model: Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql)

}

module.exports = {
    listar,
    cadastrar,
    listarMunicipio,
    buscarEstabelecimento,
    atualizar,
    deletar
}