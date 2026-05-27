var database = require("../database/config");

function enviar(nome, email, situacao, descricao, fkUsuario) {
    var instrucao = `
        INSERT INTO chamadoSuporte (
           nomeCompleto, 
           email, 
           situacao, 
           descricao, 
           dataAbertura, 
           horaAbertura, 
           fkUsuario)
        VALUES(
            '${nome}',
            '${email}',
            '${situacao}',
            '${descricao}',
            CURDATE(),
            CURTIME(),
            ${fkUsuario}
        );
    `;

    console.log("Model: Executando SQL:", instrucao);

    return database.executar(instrucao);
}

module.exports = {
    enviar
}