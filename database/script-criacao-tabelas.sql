-- SCRIPT DE CRIAÇÃO DAS TABELAS

CREATE DATABASE tourTech;
USE tourTech;

-- TABELA NIVEL ACESSO
CREATE TABLE nivelAcesso (
    idNivelAcesso INT PRIMARY KEY AUTO_INCREMENT,
    nivel VARCHAR(15),
    descricao VARCHAR(50)
);

-- TABELA USUARIO
CREATE TABLE usuario (
    idUsuario INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(200),
    email VARCHAR(45),
    senha VARCHAR(12),
    fkNivelAcesso INT,
    FOREIGN KEY (fkNivelAcesso) REFERENCES nivelAcesso(idNivelAcesso)
);

-- TABELA LOG SISTEMA
CREATE TABLE logSistema (
    idLog INT PRIMARY KEY AUTO_INCREMENT,
    evento VARCHAR(50),
    data DATE,
    hora TIME,
    fkUsuario INT,
    FOREIGN KEY (fkUsuario) REFERENCES usuario(idUsuario)
);

-- TABELA EMPRESA
CREATE TABLE empresa (
    idEmpresa INT PRIMARY KEY AUTO_INCREMENT,
    razaoSocial VARCHAR(100),
    nomeFantasia VARCHAR(100),
    cnpj CHAR(14),
    fkUsuario INT,
    FOREIGN KEY (fkUsuario) REFERENCES usuario(idUsuario)
);

-- TABELA TOKEN CADASTRO
CREATE TABLE tokenCadastro (
    idToken INT PRIMARY KEY AUTO_INCREMENT,
    codigoToken VARCHAR(6),
    dataCriacao DATE,
    fkEmpresa INT,
    fkNivelAcesso INT,
    FOREIGN KEY (fkEmpresa) REFERENCES empresa(idEmpresa),
    FOREIGN KEY (fkNivelAcesso) REFERENCES nivelAcesso(idNivelAcesso)
);

-- TABELA CHAMADO SUPORTE
CREATE TABLE chamadoSuporte (
    idChamado INT PRIMARY KEY AUTO_INCREMENT,
    nomeCompleto VARCHAR(100),
    email VARCHAR(100),
    situacao VARCHAR(150),
    descricao VARCHAR(500),
    dataAbertura DATE,
    horaAbertura TIME,
    fkUsuario INT,
    FOREIGN KEY (fkUsuario) REFERENCES usuario(idUsuario)
);

-- TABELA ESTADO
CREATE TABLE estado (
    idEstado INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(45),
    sigla CHAR(2)
);

-- TABELA MUNICIPIO
CREATE TABLE municipio (
    idMunicipio INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(100),
    fkEstado INT,
    FOREIGN KEY (fkEstado) REFERENCES estado(idEstado)
);

-- TABELA PAIS ORIGEM
CREATE TABLE paisOrigem (
    idPais INT PRIMARY KEY AUTO_INCREMENT,
    nomePais VARCHAR(45)
);

-- TABELA CHEGADA TURISTA
CREATE TABLE chegadaTurista (
    idChegadaTurista INT PRIMARY KEY AUTO_INCREMENT,
    data DATE,
    quantidade INT,
    fkPais INT,
    fkMunicipio INT,
    fkEstado INT,
    FOREIGN KEY (fkPais) REFERENCES paisOrigem(idPais),
    FOREIGN KEY (fkMunicipio) REFERENCES municipio(idMunicipio),
    FOREIGN KEY (fkEstado) REFERENCES estado(idEstado)
);

-- TABELA HOSPEDAGEM
CREATE TABLE hospedagem (
    idHospedagem INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(100),
    categoria VARCHAR(45),
    qtdQuartos INT,
    fkMunicipio INT,
    fkEstado INT,
    FOREIGN KEY (fkMunicipio) REFERENCES municipio(idMunicipio),
    FOREIGN KEY (fkEstado) REFERENCES estado(idEstado)
);

-- TABELA ATRATIVO TURISTICO
CREATE TABLE atrativoTuristico (
    idAtrativo INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(100),
    categoria VARCHAR(45),
    fkMunicipio INT,
    fkEstado INT,
    FOREIGN KEY (fkMunicipio) REFERENCES municipio(idMunicipio),
    FOREIGN KEY (fkEstado) REFERENCES estado(idEstado)
);

-- TABELA AVALIACAO
CREATE TABLE avaliacao (
    idAvaliacao INT PRIMARY KEY AUTO_INCREMENT,
    nota CHAR(1),
    precoMedio DOUBLE,
    fkHospedagem INT,
    fkAtrativo INT,
    FOREIGN KEY (fkHospedagem) REFERENCES hospedagem(idHospedagem),
    FOREIGN KEY (fkAtrativo) REFERENCES atrativoTuristico(idAtrativo)
);
