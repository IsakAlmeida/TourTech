var database = require("../database/config");

// Listar Estabelecimento 
function listar() {
    var instrucaoSql = `
       SELECT 
            h.idHospedagem,
            h.nome,
            h.categoria,
            a.nota,
            a.precoMedio
        FROM hospedagem h
        JOIN avaliacao a 
            ON h.idHospedagem = a.fkHospedagem
        ORDER BY a.nota DESC;
    `;

    console.log("Executando SQL:\n" + instrucaoSql);
    return database.executar(instrucaoSql);
}


// Cadastrar Estabelecimento
function cadastrar(nome, categoria, QtQuarto, fkMunicipio, nota, precoMedio) {
    var instrucao = `
        INSERT INTO hospedagem (
        nome, 
        categoria, 
        qtdQuartos,
        fkMunicipio
        ) VALUES(
            '${nome}',
            '${categoria}',
            '${QtQuarto}',
            ${fkMunicipio}
        );
    `;

    console.log("Model: Executando SQL:", instrucao);

    return database.executar(instrucao)
        .then(resultado => {

            var idHospedagem = resultado.insertId;
            var instrucaoSql = `
                INSERT INTO avaliacao (
                nota, 
                precoMedio, 
                fkHospedagem)
                VALUES (
                '${nota}', 
                '${precoMedio}', 
                ${idHospedagem});
            `;
            console.log("Model: Executando SQL:", instrucaoSql);

            return database.executar(instrucaoSql);
        });
}

// Municipio
function listarMunicipio() {
    var instrucaoSql = `
        SELECT 
        idMunicipio, 
        nome 
        FROM municipio;
    `;
    console.log("Model: Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

// Buscar
function buscarEstabelecimento(idHospedagem) {
    var instrucao = `
          SELECT 
            h.idHospedagem,
            h.nome,
            h.categoria,
            h.qtdQuartos,
            m.idMunicipio,
            a.nota, 
            a.precoMedio
        FROM hospedagem h
        JOIN avaliacao a 
        ON h.idHospedagem = a.fkHospedagem
        JOIN municipio m
        ON m.idMunicipio = h.fkMunicipio
        WHERE h.idHospedagem = ${idHospedagem};
    `;

    console.log("Model: Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

// Atualizar
function atualizar(idHospedagem, nome, categoria, QtQuarto, fkMunicipio, nota, precoMedio) {

    var atualizarHospedagem = `
        UPDATE hospedagem SET
            nome = '${nome}',
            categoria = '${categoria}',
            qtdQuartos = ${QtQuarto},
            fkMunicipio = ${fkMunicipio}
        WHERE idHospedagem = ${idHospedagem};
    `;

    var atualizarAvaliacao = `
        UPDATE avaliacao SET
            nota = '${nota}',
            precoMedio = '${precoMedio}'
        WHERE fkHospedagem = ${idHospedagem};
    `;

    console.log("Model: Executando a instrução SQL: \n" + atualizarHospedagem);
    console.log("Model: Executando a instrução SQL: \n" + atualizarAvaliacao);

    return database.executar(atualizarHospedagem)
        .then(() => database.executar(atualizarAvaliacao));
}

// Deletar
function deletar(id_hospedagem) {
    var deletarAvaliacao = `
        DELETE FROM avaliacao WHERE fkHospedagem = ${id_hospedagem};
    `;

    var deletarHospedagem = `
        DELETE FROM hospedagem WHERE idHospedagem = ${id_hospedagem};
    `;

    console.log("Model: Executando a instrução SQL: \n" + deletarAvaliacao);
    console.log("Model: Executando a instrução SQL: \n" + deletarHospedagem);
    return database.executar(deletarAvaliacao)
        .then(() => database.executar(deletarHospedagem));
}

module.exports = {
    listar,
    cadastrar,
    listarMunicipio,
    buscarEstabelecimento,
    atualizar,
    deletar
}