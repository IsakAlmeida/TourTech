var database = require("../database/config");

//Nacional
// KPI Estado 
function kpiNacionalEstado() {
    var instrucaoSql = `
        SELECT e.nome AS nome_estado
        FROM chegadaTurismo c
        JOIN estado e ON c.fkEstado = e.idEstado
        WHERE e.nome != 'Rio de Janeiro' /* Ajuste se houver outra regra de negócio */
        GROUP BY e.nome 
        ORDER BY SUM(c.quantidade) DESC 
        LIMIT 1;
    `;
    console.log("Executando SQL:\n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

//KPIPicoDemanda
function kpiModaNacional() {
    var instrucaoSql = `
        SELECT t.nomeMes AS mes_pico 
        FROM chegadaTurismo c
        JOIN tempo t ON c.fkTempo = t.idTempo
        WHERE c.fkEstado IS NOT NULL 
        GROUP BY t.nomeMes 
        ORDER BY SUM(c.quantidade) DESC 
        LIMIT 1;
    `;
    console.log("Executando SQL:\n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

//InterNacional
// KPI Estado 
function kpiInterNacionalEstado() {
    var instrucaoSql = `
        SELECT p.nomePais AS nome_pais 
        FROM chegadaTurismo c
        JOIN paisOrigem p ON c.fkPais = p.idPais
        WHERE p.nomePais != 'Brasil'
        GROUP BY p.nomePais 
        ORDER BY SUM(c.quantidade) DESC 
        LIMIT 1;
    `;
    console.log("Executando SQL:\n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

//KPIPicoDemanda

function kpiPicoDemandaInterNacional() {
    var instrucaoSql = `
        SELECT t.nomeMes AS mes_pico 
        FROM chegadaTurismo c
        JOIN tempo t ON c.fkTempo = t.idTempo
        JOIN paisOrigem p ON c.fkPais = p.idPais
        WHERE p.nomePais != 'Brasil'
        GROUP BY t.nomeMes 
        ORDER BY SUM(c.quantidade) DESC 
        LIMIT 1;
    `;
    console.log("Executando SQL:\n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

//--------------------------------------------------------------------------------------

//Nacional
// Grafico Estado 
function chartNacionalEstado() {
    var instrucaoSql = `
        SELECT 
            IF(posicao <= 5, nome_estado, 'Outros') AS label,
            SUM(total) AS data
        FROM (
            SELECT e.nome AS nome_estado, SUM(c.quantidade) AS total,
                   ROW_NUMBER() OVER(ORDER BY SUM(c.quantidade) DESC) AS posicao
            FROM chegadaTurismo c
            JOIN estado e ON c.fkEstado = e.idEstado
            WHERE e.nome != 'Rio de Janeiro'
            GROUP BY e.nome
        ) AS ranking
        GROUP BY label
        ORDER BY data DESC;
    `;
    console.log("Executando SQL:\n" + instrucaoSql);
    return database.executar(instrucaoSql);
}


//InterNacional
// Grafico Estado 
function chartInterNacionalEstado() {
    var instrucaoSql = `
        SELECT 
            IF(posicao <= 5, nome_pais, 'Outros') AS label,
            SUM(total) AS data
        FROM (
            SELECT p.nomePais AS nome_pais, SUM(c.quantidade) AS total,
                   ROW_NUMBER() OVER(ORDER BY SUM(c.quantidade) DESC) AS posicao
            FROM chegadaTurismo c
            JOIN paisOrigem p ON c.fkPais = p.idPais
            WHERE p.nomePais != 'Brasil'
            GROUP BY p.nomePais
        ) AS ranking
        GROUP BY label
        ORDER BY data DESC;
    `;
    console.log("Executando SQL:\n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

//Grafico Nacional X Internacional
function chartNacionalXInternacional() {
    var instrucaoSql = `
        SELECT 
            t.nomeMes AS label,
            SUM(IF(c.fkEstado IS NOT NULL, c.quantidade, 0)) AS dataNacional,
            SUM(IF(p.nomePais != 'Brasil', c.quantidade, 0)) AS dataInternacional
        FROM chegadaTurismo c
        JOIN tempo t ON c.fkTempo = t.idTempo
        left JOIN paisOrigem p ON c.fkPais = p.idPais
        GROUP BY t.mes, t.nomeMes
        ORDER BY t.mes ASC;
    `;
    console.log("Executando SQL:\n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    kpiNacionalEstado,
    kpiModaNacional,
    kpiInterNacionalEstado,
    kpiPicoDemandaInterNacional,
    chartNacionalEstado,
    chartInterNacionalEstado,
    chartNacionalXInternacional
}