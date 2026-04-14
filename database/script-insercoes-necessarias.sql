use TourTech;
SELECT * FROM hospedagem;
SELECT * FROM logsGerais;
SELECT * FROM estabelecimentoAlimenticio;
SELECT * FROM atrativoTuristico JOIN fatoVisitaAtrativo ON idAtrativo = fkAtrativo JOIN tempo ON idTempo = fkTempo;
SELECT * FROM fatoVisitaAtrativo;


INSERT INTO estado (nome, sigla) VALUES ("Rio de Janeiro", "RJ"),
('São Paulo', 'SP'),
('Minas Gerais', 'MG'),
('Espírito Santo', 'ES'),
('Paraná', 'PR'),
('Bahia', 'BA'),
('Santa Catarina', 'SC'),
('Rio Grande do Sul', 'RS'),
('Distrito Federal', 'DF'),
('Ceará', 'CE'),
('Pernambuco', 'PE'),
('Goiás', 'GO'),
('Paraíba', 'PB'),
('Pará', 'PA'),
('Rio Grande do Norte', 'RN'),
('Maranhão', 'MA'),
('Amazonas', 'AM'),
('Mato Grosso', 'MT'),
('Mato Grosso do Sul', 'MS'),
('Alagoas', 'AL'),
('Sergipe', 'SE'),
('Piauí', 'PI'),
('Tocantins', 'TO'),
('Rondônia', 'RO'),
('Roraima', 'RR'),
('Acre', 'AC'),
('Amapá', 'AP');

INSERT INTO Municipio (nome, fkEstado) VALUES ("Rio de Janeiro", 1),
('Angra dos Reis', 1), ('Aperibé', 1), ('Araruama', 1), ('Areal', 1), ('Armação dos Búzios', 1),
('Arraial do Cabo', 1), ('Barra do Piraí', 1), ('Barra Mansa', 1), ('Belford Roxo', 1), ('Bom Jardim', 1),
('Bom Jesus do Itabapoana', 1), ('Cabo Frio', 1), ('Cachoeiras de Macacu', 1), ('Cambuci', 1), ('Carapebus', 1),
('Comendador Levy Gasparian', 1), ('Campos dos Goytacazes', 1), ('Cantagalo', 1), ('Cardoso Moreira', 1), ('Carmo', 1),
('Casimiro de Abreu', 1), ('Conceição de Macabu', 1), ('Cordeiro', 1), ('Duas Barras', 1), ('Duque de Caxias', 1),
('Engenheiro Paulo de Frontin', 1), ('Guapimirim', 1), ('Iguaba Grande', 1), ('Itaboraí', 1), ('Itaguaí', 1),
('Italva', 1), ('Itaocara', 1), ('Itaperuna', 1), ('Itatiaia', 1), ('Japeri', 1), ('Laje do Muriaé', 1),
('Macaé', 1), ('Macuco', 1), ('Magé', 1), ('Mangaratiba', 1), ('Maricá', 1), ('Mendes', 1),
('Mesquita', 1), ('Miguel Pereira', 1), ('Miracema', 1), ('Natividade', 1), ('Nilópolis', 1), ('Niterói', 1),
('Nova Friburgo', 1), ('Nova Iguaçu', 1), ('Paracambi', 1), ('Paraíba do Sul', 1), ('Paraty', 1),
('Paty do Alferes', 1), ('Petrópolis', 1), ('Pinheiral', 1), ('Piraí', 1), ('Porciúncula', 1), ('Porto Real', 1),
('Quatis', 1), ('Queimados', 1), ('Quissamã', 1), ('Resende', 1), ('Rio Bonito', 1), ('Rio das Flores', 1),
('Rio das Ostras', 1), ('Rio Claro', 1), ('Santa Maria Madalena', 1), ('Santo Antônio de Pádua', 1),
('São Francisco de Itabapoana', 1), ('São Fidélis', 1), ('São Gonçalo', 1), ('São João da Barra', 1),
('São João de Meriti', 1), ('São José de Ubá', 1), ('São José do Vale do Rio Preto', 1), ('São Pedro da Aldeia', 1),
('São Sebastião do Alto', 1), ('Sapucaia', 1), ('Saquarema', 1), ('Seropédica', 1), ('Silva Jardim', 1),
('Sumidouro', 1), ('Tanguá', 1), ('Teresópolis', 1), ('Trajano de Moraes', 1), ('Três Rios', 1), ('Valença', 1),
('Varre-Sai', 1), ('Vassouras', 1), ('Volta Redonda', 1);

INSERT INTO tempo (mes, nomeMes, ano) VALUES (1, "JAN", 2024),
(2, "FEV", 2024),
(3, "MAR", 2024),
(4, "ABR", 2024),
(5, "MAI", 2024),
(6, "JUN", 2024),
(7, "JUL", 2024),
(8, "AGO", 2024),
(9, "SET", 2024),
(10, "OUT", 2024),
(11, "NOV", 2024),
(12, "DEZ", 2024);