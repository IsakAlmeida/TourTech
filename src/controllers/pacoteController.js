var pacoteModel = require("../models/pacoteModel");

//listar pacotes
function listarPacotes(req, res) {
    pacoteModel.listarPacotes()
        .then(function (resultado) {
            if (resultado.length > 0) {
                res.status(200).json(resultado);
            } else {
                res.status(204).send("Controller: Nenhum Pacote encontrado!")
            }
        }).catch(function (erro) {
            console.log(erro);
            console.log("Controller: Houve um erro ao buscar pacotes");
            res.status(500).json(erro.sqlMessage);
        });
}

function listarMunicipio(req, res) {
    pacoteModel.listarMunicipio()
        .then(function (resultado) {
            if (resultado.length > 0) {
                res.status(200).json(resultado);
            } else {
                res.status(204).send("Controller: Nenhum município encontrado!")
            }
        }).catch(function (erro) {
            console.log(erro);
            console.log("Controller: Houve um erro ao localizar municípios");
            res.status(500).json(erro.sqlMessage);
        });
}

function listarHospedagem(req, res) {
    pacoteModel.listarHospedagem()
        .then(function (resultado) {
            if (resultado.length > 0) {
                res.status(200).json(resultado);
            } else {
                res.status(204).send("Controller: Nenhuma hospedagem encontrada!")
            }
        }).catch(function (erro) {
            console.log(erro);
            console.log("Controller: Houve um erro ao buscar as hospedagens");
            res.status(500).json(erro.sqlMessage);
        });
}

function listarAlimentacao(req, res) {
    pacoteModel.listarAlimentacao()
        .then(function (resultado) {
            if (resultado.length > 0) {
                res.status(200).json(resultado);
            } else {
                res.status(204).send("Controller: Nenhum estabelecimento alimentício encontrado!")
            }
        }).catch(function (erro) {
            console.log(erro);
            console.log("Controller: Houve um erro ao buscar estabelecimentos alimentícios");
            res.status(500).json(erro.sqlMessage);
        });
}

//cadastrar pacote
function cadastrar(req, res) {
    var nome = req.body.nome;
    var fkMunicipio = req.body.fkMunicipio;
    var fkHospedagem = req.body.fkHospedagem;
    var fkEstabelecimento = req.body.fkEstabelecimento;
    var atrativos = req.body.atrativos || [];

    if (!nomePacote || !fkMunicipio || !fkHospedagem || !fkEstabelecimento) {
        return res.status(400).json({
            erro: "Controller: Todos os campos são obrigatórios"
        });
    }

    console.log("Controller: Cadastrando Pacote:", { nomePacote, local, hospedagem, hosped, alimentacao, alimen });

    pacoteModel.cadastrar(nome, fkMunicipio, fkHospedagem, fkEstabelecimento, atrativos)
        .then(function (resultado) {
            res.status(201).json({
                mensagem: "Controller: Pacote cadastrado com sucesso"
            });
        })
        .catch(function (erro) {
            console.log(erro);
            res.status(500).send("Erro no servidor");
        });

}
// buscar pacote

function buscar(req, res) {
    var idPacote = req.params.idPacote;

    if (!idPacote) {
        return res.status(400).send("ID do pacote não informado");
    }

    pacoteModel.buscar(idPacote)
        .then(function (resultado) {
            console.log("Controller: Pacote buscado com sucesso ", resultado);
            res.status(200).json(resultado);
        })
        .catch(function (erro) {
            console.log(erro);
            res.status(500).send("Erro no servidor ao buscar pacote");

        });
}

// atualizar pacote
function atualizar(req, res) {

    var idPacote = req.body.idPacote;
    var nome = req.body.nome;
    var fkMunicipio = req.body.fkMunicipio;
    var fkHospedagem = req.body.fkHospedagem;
    var fkEstabelecimento = req.body.fkEstabelecimento;

    if (!idPacote || !nome || !fkMunicipio || !fkHospedagem || !fkEstabelecimento) {
        return res.status(400).json({
            erro: "Controller: Todos os campos para atualização são obrigatórios"
        });
    }

    pacoteModel.atualizar(idPacote, nome, fkMunicipio, fkHospedagem, fkEstabelecimento)
        .then(function (resultado) {
            res.status(200).json({
                mensagem: "Controller: Atualizado com sucesso", resultado
            });
        })
        .catch(
            function (erro) {
                console.log(erro);
                console.log("Controller: Houve um erro ao atualizar o pacote: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        );
}

// deletar pacote
function deletar(req, res) {
    var id_pacote = req.body.idPacote;

    if (!id_pacote) {
        return res.status(400).send("ID não informado");
    }

    pacoteModel.deletar(id_pacote)
        .then(function (resultado) {
            res.status(200).json({
                mensagem: "Controller: Deletado com sucesso", resultado

            });
        })
        .catch(
            function (erro) {
                console.log(erro);
                console.log("Controller: Houve um erro ao deletar pacote: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        );
}

module.exports = {
    listarPacotes,
    cadastrar,
    buscar,
    atualizar,
    deletar
};
