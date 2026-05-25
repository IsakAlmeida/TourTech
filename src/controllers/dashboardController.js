var dashboardModel = require("../models/dashboardModel");

// Listar Funcionario
function kpiModaNacional(req, res) {
    
    dashboardModel.kpiModaNacional()
        .then(function (resultado) {
            if (resultado.length > 0) {
                res.status(200).json(resultado);
            } else {
                res.status(204).send("Controller: Nenhum KPI encontrado!")
            }
        }).catch(function (erro) {
            console.log(erro);
            console.log("Controller: Houve um erro ao buscar as KPI: ", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        });
}


// Niveis
function listarNiveis(req, res) {
    funcionarioModel.listarNiveis()
        .then(function (resultado) {
            if (resultado.length > 0) {
                res.status(200).json(resultado);
            } else {
                res.status(204).send("Controller: Nenhum Nivel encontrado!")
            }
        }).catch(function (erro) {
            console.log(erro);
            console.log("Controller: Houve um erro ao listar os niveis: ", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        }
        );
}


module.exports = {
    kpiModaNacional,
    listarNiveis,
    };