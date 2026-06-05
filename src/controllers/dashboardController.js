var dashboardModel = require("../models/dashboardModel");

//Nacional
// KPI Estado
function kpiNacionalEstado(req, res) {
    
    dashboardModel.kpiNacionalEstado()
        .then(function (resultado) {
            if (resultado.length > 0) {
                res.status(200).json(resultado);
            } else {
                res.status(204).send("Controller: Nenhum kpiNacionalEstado encontrado!")
            }
        }).catch(function (erro) {
            console.log(erro);
            console.log("Controller: Houve um erro ao buscar as KPI: ", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        });
}

//KPIPicoDemanda
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

//InterNacional
// KPI Estado
function kpiInterNacionalEstado(req, res) {
    
    dashboardModel.kpiInterNacionalEstado()
        .then(function (resultado) {
            if (resultado.length > 0) {
                res.status(200).json(resultado);
            } else {
                res.status(204).send("Controller: Nenhum kpiInterNacionalEstado encontrado!")
            }
        }).catch(function (erro) {
            console.log(erro);
            console.log("Controller: Houve um erro ao buscar as KPI: ", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        });
}

//KPI PicoDemanda
function kpiPicoDemandaInterNacional(req, res) {
    
    dashboardModel.kpiPicoDemandaInterNacional()
        .then(function (resultado) {
            if (resultado.length > 0) {
                res.status(200).json(resultado);
            } else {
                res.status(204).send("Controller: Nenhum kpiPicoDemandaInterNacional encontrado!")
            }
        }).catch(function (erro) {
            console.log(erro);
            console.log("Controller: Houve um erro ao buscar as KPI: ", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        });
}

//--------------------------------------------------
//Nacional
// Grafico Estado
function chartNacionalEstado(req, res) {
    
    dashboardModel.chartNacionalEstado()
        .then(function (resultado) {
            if (resultado.length > 0) {
                res.status(200).json(resultado);
            } else {
                res.status(204).send("Controller: Nenhum chartNacionalEstado encontrado!")
            }
        }).catch(function (erro) {
            console.log(erro);
            console.log("Controller: Houve um erro ao buscar as chart: ", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        });
}

//Gráfico PicoDemanda
function chartModaNacional(req, res) {
    
    dashboardModel.chartModaNacional()
        .then(function (resultado) {
            if (resultado.length > 0) {
                res.status(200).json(resultado);
            } else {
                res.status(204).send("Controller: Nenhum chart encontrado!")
            }
        }).catch(function (erro) {
            console.log(erro);
            console.log("Controller: Houve um erro ao buscar as chart: ", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        });
}

//InterNacional
// Grafico Estado
function chartInterNacionalEstado(req, res) {
    
    dashboardModel.chartInterNacionalEstado()
        .then(function (resultado) {
            if (resultado.length > 0) {
                res.status(200).json(resultado);
            } else {
                res.status(204).send("Controller: Nenhum chartInterNacionalEstado encontrado!")
            }
        }).catch(function (erro) {
            console.log(erro);
            console.log("Controller: Houve um erro ao buscar as chart: ", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        });
}

//Grafico PicoDemanda
// function chartInterNacionalEstado(req, res) {
    
//     dashboardModel.chartInterNacionalEstado()
//         .then(function (resultado) {
//             if (resultado.length > 0) {
//                 res.status(200).json(resultado);
//             } else {
//                 res.status(204).send("Controller: Nenhum chartInterNacionalEstado encontrado!")
//             }
//         }).catch(function (erro) {
//             console.log(erro);
//             console.log("Controller: Houve um erro ao buscar as chart: ", erro.sqlMessage);
//             res.status(500).json(erro.sqlMessage);
//         });
// }

//Grafico Nacional X Internacional
function chartNacionalXInternacional(req, res) {
    
    dashboardModel.chartNacionalXInternacional()
        .then(function (resultado) {
            if (resultado.length > 0) {
                res.status(200).json(resultado);
            } else {
                res.status(204).send("Controller: Nenhum chartNacionalXInternacional encontrado!")
            }
        }).catch(function (erro) {
            console.log(erro);
            console.log("Controller: Houve um erro ao buscar as chart: ", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        });
}

module.exports = {
    kpiNacionalEstado,
    kpiModaNacional,
    kpiInterNacionalEstado,
    kpiPicoDemandaInterNacional,
    chartNacionalEstado,
    chartInterNacionalEstado,
    chartNacionalXInternacional,
    chartModaNacional
    };