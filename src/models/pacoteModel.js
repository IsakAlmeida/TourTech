const { listarPacotes } = require("../controllers/pacoteController");
var database = require("../database/config");

// Listar Estabelecimento 
function listarPacotes() {
    var instrucaoSql = `
       SELECT
            p.idPacote 
            p.nome as nomePacote,
            m.nome as municipio,
            h.nome as hospedagem,
            e.estabelecimento as estabelecimento
        FROM pacote p
        JOIN municipio m
            ON p.fkMunicipio = m.idMunicipio,
        JOIN hospedagem h
            ON p.fkHospedagem = h.idHospedagem,
        JOIN estabelecimentoAlimenticio e
            ON p.fkEstabelecimento = e.idEstabelecimento
        ORDER BY p.idPacote;
    `;

    console.log("Executando SQL:\n" + instrucaoSql);
    return database.executar(instrucaoSql);
}


//cadastrar pacote
function cadastrar(nome, fkMunicipio, fkHospedagem, fkEstabelecimento, atrativos = []) {
    var instrucao = `
        INSERT INTO pacote (
        nome, 
        fkMunicipio, 
        fkHospedagem,
        fkEstabelecimento
        ) VALUES(
            '${nome}',
            '${fkMunicipio}',
            '${fkHospedagem}',
            ${fkEstabelecimento}
        );
    `;

    console.log("Executando SQL:\n" + instrucaoSql);

    return database.executar(instrucaoSql)
        .then(resultado => {
            var idPacote = resultado.insertId;

            if (!atrativos.length) {
                return resultado;
            }

            var promessas = atrativos.map(idAtrativo => {
                var sqlAtrativo = `
                    INSERT INTO pacote_atrativo (pacote_id, atrativo_id)
                    VALUES (${idPacote}, ${idAtrativo});
                `;
                console.log("Executando SQL:\n" + sqlAtrativo);
                return database.executar(sqlAtrativo);
            });

            return Promise.all(promessas);
        });
}

// Buscar
function buscar(idPacote) {
    var instrucao = `
          SELECT 
            p.idPacote,
            p.nome,
            p.fkMunicipio,
            p.fkHospedagem,
            p.fkEstabelecimento,
        FROM pacote p
        WHERE p.idPacote = ${idPacote};
    `;

    console.log("Model: Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

// Atualizar
function atualizar(idPacote, nome, fkMunicipio, fkHospedagem, fkEstabelecimento) {

    var atualizarPacote = `
        UPDATE pacote SET
            nome = '${nome}',
            fkMunicipio = '${fkMunicipio}',
            fkHospedagem = ${fkHospedagem},
            fkEstabelecimento = ${fkEstabelecimento}
        WHERE idPacote = ${idPacote};
    `;

    console.log("Model: Executando a instrução SQL: \n" + atualizarPacote);
    return database.executar(atualizarPacote);
}

// Deletar
function deletar(idPacote) {
    var deletarRelacionamentos = `
        DELETE FROM pacote_atrativo WHERE pacote_id = ${idPacote};
    `;

    var deletarPacote = `
        DELETE FROM pacote WHERE idPacote = ${idPacote};
    `;

    console.log("Model: Executando a instrução SQL: \n" + deletarRelacionamentos);
    console.log("Model: Executando a instrução SQL: \n" + deletarPacote);
    return database.executar(deletarRelacionamentos)
        .then(() => database.executar(deletarPacote));
}

module.exports = {
    listarPacotes,
    cadastrar,
    buscar,
    atualizar,
    deletar
}