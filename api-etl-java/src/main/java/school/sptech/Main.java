package school.sptech;

import org.springframework.jdbc.core.JdbcTemplate;
import school.sptech.database.Conexao;
import school.sptech.model.*;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {

        Conexao conexao = new Conexao();
        JdbcTemplate template = new JdbcTemplate(conexao.getConexao());
        Scanner sc = new Scanner(System.in);
        List<Log> logs = new ArrayList<>();
        Log log;

        String url = "jdbc:mysql://127.0.0.1:3306/TourTech";
        String usuario = "adminTourTech";
        String senha = "AdmTourTech123";

        Integer op = 0;

        System.out.println("Bem vindo ao sistema de leitura e inserção de dados da TourTech");
        do {
            System.out.println("Escolha uma opção para ler e inserir dados no banco de dados: ");
            System.out.println("================================================================");
            System.out.println("0 - Países");
            System.out.println("1 - Hospedagem");
            System.out.println("2 - Estabelecimentos Alimenticios");
            System.out.println("3 - Atrativos Turisticos");
            System.out.println("4 - Visitas Nacionais por Atrativos Turisticos");
            System.out.println("5 - Visitas Internacionais por Atrativos Turisticos");
            System.out.println("6 - Chegadas Nacionais ao Rio de Janeiro");
            System.out.println("7 - Chegadas Interacionais ao Rio de Janeiro");
            System.out.println("8 - Sair");
            System.out.println("================================================================");
            op = sc.nextInt();

            if(op < 0 || op > 8){
                System.out.println("Digite uma opção válida!!");
                System.out.println();
            }

            if(op == 8){
                System.out.println("Até mais!");
                break;
            }

            //PAÍSES
            if(op == 0){
                String sqlBuscaPais = "SELECT idPais FROM paisOrigem WHERE nomePais = ?";
                String sqlInsertPais = "INSERT INTO paisOrigem(nomePais) VALUES (?)";

                // LEITURA DO EXCEL
                System.out.println("Lendo Excel...");
                log = new Log("INICIO LEITURA EXCEL PAÍSES", "SUCESSO", "ARQUIVO");
                logs.add(log);

                String nomeArquivoHospedagem = "turismo-rio-de-janeiro.xlsx";
                LeitorExcel leitor = new LeitorExcel();
                List<Pais> lista = leitor.extrairPaises(nomeArquivoHospedagem);

                log = new Log("LEITURA PAÍSES FINALIZADA", "SUCESSO", "ARQUIVO");
                logs.add(log);

                // INSERÇÃO NO BANCO
                System.out.println("Inserindo no banco...");
                log = new Log("INICIO INSERT PAÍSES", "SUCESSO", "BANCO");
                logs.add(log);

                try (Connection conn = DriverManager.getConnection(url, usuario, senha);
                     PreparedStatement stmtBuscaPais = conn.prepareStatement(sqlBuscaPais);
                     PreparedStatement stmtInsert = conn.prepareStatement(sqlInsertPais)) {

                    conn.setAutoCommit(false);

                    for (int i = 0; i < lista.size(); i++) {

                        Pais pais = lista.get(i);

                        try {
                            stmtBuscaPais.setString(1, pais.getNome().trim());
                            ResultSet resultSet = stmtBuscaPais.executeQuery();

                            if (resultSet.next()) {
                                System.out.println("País já no banco de dados: " + pais.getNome());
                                logs.add(new Log("PAÍSES: País já no banco de dados: " + pais.getNome(), "FALHA", "BANCO"));
                                continue;
                            }

                            stmtInsert.setString(1, pais.getNome());
                            stmtInsert.addBatch();
                            System.out.println("Preparado para inserir: " + pais.getNome());

                        } catch (Exception e) {
                            System.out.println("Erro: " + e.getMessage());
                        }
                    }

                    stmtInsert.executeBatch();
                    conn.commit();

                    log = new Log("INSERT PAISES FINALIZADO", "SUCESSO", "BANCO");
                    logs.add(log);

                } catch (Exception e) {
                    log = new Log("PAISES: ERRO GERAL NO BANCO", "FALHA", "BANCO");
                    logs.add(log);
                    System.out.println(e.getMessage());
                }

                // INSERINDO LOGS NO BANCO
                System.out.println("Inserindo logs...");

                String queryLogs = "INSERT INTO logsGerais (dataHora, evento, status, objeto) VALUES ";

                for (int i = 0; i < logs.size(); i++) {

                    if (i != 0) queryLogs += ",\n";

                    queryLogs += "('" + logs.get(i).getDataHora() + "', '" +
                            logs.get(i).getEvento() + "', '" +
                            logs.get(i).getStatus() + "', '" +
                            logs.get(i).getObjeto() + "')";
                }

                queryLogs += ";";

                template.update(queryLogs);

                System.out.println("Processo de países finalizado.");
                System.out.println("==============================================");
                System.out.println();
            }

            // HOSPEDAGEM
            if(op == 1){
                String sqlBuscaMunicipio = "SELECT idMunicipio FROM municipio WHERE nome = ?";
                String sqlInsertHospedagem = "INSERT INTO hospedagem(nome, categoria, endereco, multilingue, contato, emailComercial, fkMunicipio) VALUES (?, ?, ?, ?, ?, ?, ?)";

                // LEITURA DO EXCEL
                System.out.println("Lendo Excel...");
                log = new Log("INICIO LEITURA EXCEL HOSPEDAGEM", "SUCESSO", "ARQUIVO");
                logs.add(log);

                String nomeArquivoHospedagem = "meio-de-hospedagem (2).xlsx";
                LeitorExcel leitor = new LeitorExcel();
                List<Hospedagem> lista = leitor.extrairHospedagens(nomeArquivoHospedagem);

                log = new Log("LEITURA HOSPEDAGEM FINALIZADA", "SUCESSO", "ARQUIVO");
                logs.add(log);

                // INSERÇÃO NO BANCO
                System.out.println("Inserindo no banco...");
                log = new Log("INICIO INSERT HOSPEDAGEM", "SUCESSO", "BANCO");
                logs.add(log);

                try (Connection conn = DriverManager.getConnection(url, usuario, senha);
                     PreparedStatement stmtBusca = conn.prepareStatement(sqlBuscaMunicipio);
                     PreparedStatement stmtInsert = conn.prepareStatement(sqlInsertHospedagem)) {

                    conn.setAutoCommit(false);

                    for (int i = 0; i < lista.size(); i++) {

                        Hospedagem hospedagem = lista.get(i);

                        try {
                            stmtBusca.setString(1, hospedagem.getMunicipio().trim());
                            ResultSet resultSet = stmtBusca.executeQuery();

                            if (!resultSet.next()) {
                                System.out.println("Município NÃO encontrado: " + hospedagem.getMunicipio());
                                logs.add(new Log("HOSPEDAGEM: Município não encontrado: " + hospedagem.getMunicipio(), "FALHA", "BANCO"));
                                continue;
                            }

                            int fkMunicipio = resultSet.getInt("idMunicipio");

                            stmtInsert.setString(1, hospedagem.getNome());
                            stmtInsert.setString(2, hospedagem.getCategoria());
                            stmtInsert.setString(3, hospedagem.getEndereco());
                            stmtInsert.setBoolean(4, hospedagem.getMultilingue());
                            stmtInsert.setString(5, hospedagem.getContato());
                            stmtInsert.setString(6, hospedagem.getEmailComercial());
                            stmtInsert.setInt(7, fkMunicipio);

                            stmtInsert.addBatch();

                            System.out.println("Preparado para inserir: " + hospedagem.getNome());

                        } catch (Exception e) {
                            System.out.println("Erro: " + e.getMessage());
                        }
                    }

                    stmtInsert.executeBatch();
                    conn.commit();

                    log = new Log("INSERT HOSPEDAGEM FINALIZADO", "SUCESSO", "BANCO");
                    logs.add(log);

                } catch (Exception e) {
                    log = new Log("HOSPEDAGEM: ERRO GERAL NO BANCO", "FALHA", "BANCO");
                    logs.add(log);
                    System.out.println(e.getMessage());
                }

                // INSERINDO LOGS NO BANCO
                System.out.println("Inserindo logs...");

                String queryLogs = "INSERT INTO logsGerais (dataHora, evento, status, objeto) VALUES ";

                for (int i = 0; i < logs.size(); i++) {

                    if (i != 0) queryLogs += ",\n";

                    queryLogs += "('" + logs.get(i).getDataHora() + "', '" +
                            logs.get(i).getEvento() + "', '" +
                            logs.get(i).getStatus() + "', '" +
                            logs.get(i).getObjeto() + "')";
                }

                queryLogs += ";";

                template.update(queryLogs);

                System.out.println("Processo de hospedagem finalizado.");
                System.out.println("==============================================");
                System.out.println();
            }

            // ESTABELECIMENTOS
            if(op == 2){
                    String sqlBuscaMunicipio = "SELECT idMunicipio FROM municipio WHERE nome = ?";
                String sqlInsertEstabelecimento = "INSERT INTO estabelecimentoAlimenticio(nome, categoria, endereco, multilingue, contato, emailComercial, fkMunicipio) VALUES (?, ?, ?, ?, ?, ?, ?)";

                // LEITURA DO EXCEL
                System.out.println("Lendo Excel...");
                log = new Log("INICIO LEITURA EXCEL ESTABELECIMENTOS", "SUCESSO", "ARQUIVO");
                logs.add(log);

                String nomeArquivoEstabelecimento = "restaurante-cafeteria-bar-e-similares.xlsx";
                LeitorExcel leitor = new LeitorExcel();
                List<EstabelecimentoAlimenticio> lista = leitor.extrairEstabelecimentos(nomeArquivoEstabelecimento);

                log = new Log("LEITURA ESTABELECIMENTOS FINALIZADA", "SUCESSO", "ARQUIVO");
                logs.add(log);

                // INSERÇÃO NO BANCO
                System.out.println("Inserindo no banco...");
                log = new Log("INICIO INSERT ESTABELECIMENTOS", "SUCESSO", "BANCO");
                logs.add(log);

                try (Connection conn = DriverManager.getConnection(url, usuario, senha);
                     PreparedStatement stmtBusca = conn.prepareStatement(sqlBuscaMunicipio);
                     PreparedStatement stmtInsert = conn.prepareStatement(sqlInsertEstabelecimento)) {

                    conn.setAutoCommit(false);

                    for (int i = 0; i < lista.size(); i++) {

                        EstabelecimentoAlimenticio estabelecimento = lista.get(i);

                        try {
                            stmtBusca.setString(1, estabelecimento.getMunicipio().trim());
                            ResultSet rs = stmtBusca.executeQuery();

                            if (!rs.next()) {
                                System.out.println("Município NÃO encontrado: " + estabelecimento.getMunicipio());
                                logs.add(new Log("ESTABELECIMENTO: Município não encontrado: " + estabelecimento.getMunicipio(), "FALHA", "BANCO"));
                                continue;
                            }

                            int fkMunicipio = rs.getInt("idMunicipio");

                            stmtInsert.setString(1, estabelecimento.getNome());
                            stmtInsert.setString(2, estabelecimento.getCategoria());
                            stmtInsert.setString(3, estabelecimento.getEndereco());
                            stmtInsert.setBoolean(4, estabelecimento.getMultilingue());
                            stmtInsert.setString(5, estabelecimento.getContato());
                            stmtInsert.setString(6, estabelecimento.getEmailComercial());
                            stmtInsert.setInt(7, fkMunicipio);

                            stmtInsert.addBatch();

                            System.out.println("Preparado para inserir: " + estabelecimento.getNome());

                        } catch (Exception e) {
                            System.out.println("Erro: " + e.getMessage());
                        }
                    }

                    stmtInsert.executeBatch();
                    conn.commit();

                    log = new Log("INSERT ESTABELECIMENTO FINALIZADO", "SUCESSO", "BANCO");
                    logs.add(log);

                } catch (Exception e) {
                    log = new Log("ESTABELECIMENTO: ERRO GERAL NO BANCO", "FALHA", "BANCO");
                    logs.add(log);
                    System.out.println(e.getMessage());
                }

                // INSERINDO LOGS NO BANCO
                System.out.println("Inserindo logs...");

                String queryLogs = "INSERT INTO logsGerais (dataHora, evento, status, objeto) VALUES ";

                for (int i = 0; i < logs.size(); i++) {

                    if (i != 0) queryLogs += ",\n";

                    queryLogs += "('" + logs.get(i).getDataHora() + "', '" +
                            logs.get(i).getEvento() + "', '" +
                            logs.get(i).getStatus() + "', '" +
                            logs.get(i).getObjeto() + "')";
                }

                queryLogs += ";";

                template.update(queryLogs);

                System.out.println("Processo de estabelecimentoS finalizado.");
                System.out.println("==============================================");
                System.out.println();
            }

            // ATRATIVOS
            if(op == 3){
                String sqlBuscaMunicipio = "SELECT idMunicipio FROM municipio WHERE nome = ?";
                String sqlInsertAtrativos = "INSERT INTO atrativoTuristico(nome, categoria, fkMunicipio) VALUES (?, ?, ?)";

                // LEITURA DO EXCEL
                System.out.println("Lendo Excel...");
                log = new Log("INICIO LEITURA EXCEL ATRATIVOS", "SUCESSO", "ARQUIVO");
                logs.add(log);

                String nomeArquivoAtrativos = "atrativos-turisticos.xlsx";
                LeitorExcel leitor = new LeitorExcel();
                List<Atrativos> lista = leitor.extrairAtrativos(nomeArquivoAtrativos);

                log = new Log("LEITURA ATRATIVOS FINALIZADA", "SUCESSO", "ARQUIVO");
                logs.add(log);

                // INSERÇÃO NO BANCO
                System.out.println("Inserindo no banco...");
                log = new Log("INICIO INSERT ATRATIVOS", "SUCESSO", "BANCO");
                logs.add(log);

                try (Connection conn = DriverManager.getConnection(url, usuario, senha);
                     PreparedStatement stmtBusca = conn.prepareStatement(sqlBuscaMunicipio);
                     PreparedStatement stmtInsert = conn.prepareStatement(sqlInsertAtrativos)) {

                    conn.setAutoCommit(false);

                    for (int i = 0; i < lista.size(); i++) {

                        Atrativos atrativos = lista.get(i);

                        try {
                            stmtBusca.setString(1, atrativos.getMunicipio().trim());
                            ResultSet resultSet = stmtBusca.executeQuery();

                            if (!resultSet.next()) {
                                System.out.println("Município NÃO encontrado: " + atrativos.getMunicipio());
                                logs.add(new Log("ATRATIVOS: Município não encontrado: " + atrativos.getMunicipio(), "FALHA", "BANCO"));
                                continue;
                            }

                            int fkMunicipio = resultSet.getInt("idMunicipio");

                            stmtInsert.setString(1, atrativos.getNome());
                            stmtInsert.setString(2, atrativos.getCategoria());
                            stmtInsert.setInt(3, fkMunicipio);

                            stmtInsert.addBatch();

                            System.out.println("Preparado para inserir: " + atrativos.getNome());

                        } catch (Exception e) {
                            System.out.println("Erro: " + e.getMessage());
                        }
                    }

                    stmtInsert.executeBatch();
                    conn.commit();

                    log = new Log("INSERT ATRATIVOS FINALIZADO", "SUCESSO", "BANCO");
                    logs.add(log);

                } catch (Exception e) {
                    log = new Log("ATRATIVOS: ERRO GERAL NO BANCO", "FALHA", "BANCO");
                    logs.add(log);
                    System.out.println(e.getMessage());
                }

                // INSERINDO LOGS NO BANCO
                System.out.println("Inserindo logs...");

                String queryLogs = "INSERT INTO logsGerais (dataHora, evento, status, objeto) VALUES ";

                for (int i = 0; i < logs.size(); i++) {

                    if (i != 0) queryLogs += ",\n";

                    queryLogs += "('" + logs.get(i).getDataHora() + "', '" +
                            logs.get(i).getEvento() + "', '" +
                            logs.get(i).getStatus() + "', '" +
                            logs.get(i).getObjeto() + "')";
                }

                queryLogs += ";";

                template.update(queryLogs);

                System.out.println("Processo de atrativos finalizado.");
                System.out.println("==============================================");
                System.out.println();
            }

            // TURISMO NACIONAL POR ATRATIVOS
            if(op == 4){

                String sqlBuscafkTempo = "SELECT idTempo FROM tempo WHERE nomeMes = ? AND ano = ?";
                String sqlBuscafkAtrativo = "SELECT idAtrativo FROM atrativoTuristico WHERE nome = ?";
                String sqlInsert = "INSERT INTO fatoVisitaAtrativo (quantidade, estrangeiro, fkTempo, fkAtrativo) VALUES (?, 0, ?, ?)";

                System.out.println("Lendo Excel...");
                logs.add(new Log("INICIO LEITURA EXCEL TURISMO NACIONAL ATRATIVOS", "SUCESSO", "ARQUIVO"));

                LeitorExcel leitor = new LeitorExcel();
                List<TurismoNacionalAtrativo> lista = leitor.extrairTurismoNacionalAtrativo("atrativos-turisticos.xlsx");

                logs.add(new Log("LEITURA TURISMO NACIONAL ATRATIVOS FINALIZADA", "SUCESSO", "ARQUIVO"));

                System.out.println("Inserindo no banco...");
                logs.add(new Log("INICIO INSERT TURISMO NACIONAL ATRATIVOS", "SUCESSO", "BANCO"));

                try (Connection conn = DriverManager.getConnection(url, usuario, senha);
                     PreparedStatement stmtTempo = conn.prepareStatement(sqlBuscafkTempo);
                     PreparedStatement stmtAtrativo = conn.prepareStatement(sqlBuscafkAtrativo);
                     PreparedStatement stmtInsert = conn.prepareStatement(sqlInsert)) {

                    conn.setAutoCommit(false);

                    for (TurismoNacionalAtrativo turismo : lista) {

                        try {
                            stmtTempo.setString(1, turismo.getMes());
                            stmtTempo.setInt(2, turismo.getAno());

                            ResultSet resultSetTempo = stmtTempo.executeQuery();

                            if (!resultSetTempo.next()) {
                                System.out.println("Tempo não encontrado: " + turismo.getMes());
                                logs.add(new Log("TURISMO NACIONAL ATRATIVOS: Tempo não encontrado: " + turismo.getMes(), "FALHA", "BANCO"));
                                continue;
                            }

                            int fkTempo = resultSetTempo.getInt("idTempo");

                            stmtAtrativo.setString(1, turismo.getAtrativo());

                            ResultSet resultSetAtrativo = stmtAtrativo.executeQuery();

                            if (!resultSetAtrativo.next()) {
                                System.out.println("Atrativo não encontrado: " + turismo.getAtrativo());
                                logs.add(new Log("TURISMO NACIONAL ATRATIVOS: Atrativo não encontrado: " + turismo.getAtrativo(), "FALHA", "BANCO"));
                                continue;
                            }

                            int fkAtrativo = resultSetAtrativo.getInt("idAtrativo");

                            stmtInsert.setInt(1, turismo.getQuantidade());
                            stmtInsert.setInt(2, fkTempo);
                            stmtInsert.setInt(3, fkAtrativo);

                            stmtInsert.addBatch();

                        } catch (Exception e) {
                            System.out.println("Erro: " + e.getMessage());
                        }
                    }

                    stmtInsert.executeBatch();
                    conn.commit();

                    logs.add(new Log("INSERT TURISMO NACIONAL ATRATIVOS FINALIZADO", "SUCESSO", "BANCO"));

                } catch (Exception e) {
                    logs.add(new Log("ERRO GERAL TURISMO NACIONAL ATRATIVOS", "FALHA", "BANCO"));
                    System.out.println(e.getMessage());
                }

                System.out.println("Processo turismo nacional por atrativo finalizado.");
                System.out.println("==============================================");
                System.out.println();
            }

            // TURISMO INTERNACIONAL POR ATRATIVOS
            if(op == 5){

                String sqlBuscafkTempo = "SELECT idTempo FROM tempo WHERE nomeMes = ? AND ano = ?";
                String sqlBuscafkAtrativo = "SELECT idAtrativo FROM atrativoTuristico WHERE nome = ?";
                String sqlInsert = "INSERT INTO fatoVisitaAtrativo (quantidade, estrangeiro, fkTempo, fkAtrativo) VALUES (?, 1, ?, ?)";

                System.out.println("Lendo Excel...");
                logs.add(new Log("INICIO LEITURA EXCEL TURISMO INTERNACIONAL ATRATIVOS", "SUCESSO", "ARQUIVO"));

                LeitorExcel leitor = new LeitorExcel();
                List<TurismoInternacionalAtrativo> lista = leitor.extrairTurismoInternacionalAtrativo("atrativos-turisticos.xlsx");

                logs.add(new Log("LEITURA TURISMO INTERNACIONAL ATRATIVOS FINALIZADA", "SUCESSO", "ARQUIVO"));

                System.out.println("Inserindo no banco...");
                logs.add(new Log("INICIO INSERT TURISMO INTERNACIONAL ATRATIVOS", "SUCESSO", "BANCO"));

                try (Connection conn = DriverManager.getConnection(url, usuario, senha);
                     PreparedStatement stmtTempo = conn.prepareStatement(sqlBuscafkTempo);
                     PreparedStatement stmtAtrativo = conn.prepareStatement(sqlBuscafkAtrativo);
                     PreparedStatement stmtInsert = conn.prepareStatement(sqlInsert)) {

                    conn.setAutoCommit(false);

                    for (TurismoInternacionalAtrativo turismo : lista) {

                        try {
                            stmtTempo.setString(1, turismo.getMes());
                            stmtTempo.setInt(2, turismo.getAno());

                            ResultSet resultSetTempo = stmtTempo.executeQuery();

                            if (!resultSetTempo.next()) {
                                System.out.println("Tempo não encontrado: " + turismo.getMes());
                                logs.add(new Log("TURISMO INTERNACIONAL ATRATIVOS: Tempo não encontrado: " + turismo.getMes(), "FALHA", "BANCO"));
                                continue;
                            }

                            int fkTempo = resultSetTempo.getInt("idTempo");

                            stmtAtrativo.setString(1, turismo.getAtrativo());

                            ResultSet resultSetAtrativo = stmtAtrativo.executeQuery();

                            if (!resultSetAtrativo.next()) {
                                System.out.println("Atrativo não encontrado: " + turismo.getAtrativo());
                                logs.add(new Log("TURISMO INTERNACIONAL ATRATIVOS: Atrativo não encontrado: " + turismo.getAtrativo(), "FALHA", "BANCO"));
                                continue;
                            }

                            int fkAtrativo = resultSetAtrativo.getInt("idAtrativo");

                            stmtInsert.setInt(1, turismo.getQuantidade());
                            stmtInsert.setInt(2, fkTempo);
                            stmtInsert.setInt(3, fkAtrativo);

                            stmtInsert.addBatch();

                        } catch (Exception e) {
                            System.out.println("Erro: " + e.getMessage());
                        }
                    }

                    stmtInsert.executeBatch();
                    conn.commit();

                    logs.add(new Log("INSERT TURISMO INTERNACIONAL ATRATIVOS FINALIZADO", "SUCESSO", "BANCO"));

                } catch (Exception e) {
                    logs.add(new Log("ERRO GERAL TURISMO INTERNACIONAL ATRATIVOS", "FALHA", "BANCO"));
                    System.out.println(e.getMessage());
                }

                System.out.println("Processo turismo internacional por atrativo finalizado.");
                System.out.println("==============================================");
                System.out.println();
            }

            // TURISMO NACIONAL POR ESTADO
            if(op == 6){

                String sqlBuscafkTempo = "SELECT idTempo FROM tempo WHERE nomeMes = ? AND ano = ?";
                String sqlBuscafkEstado = "SELECT idEstado FROM estado WHERE nome = ?";
                String sqlInsert = "INSERT INTO chegadaTurismo (quantidade, fkTempo, fkEstado) VALUES (?, ?, ?)";

                System.out.println("Lendo Excel...");
                logs.add(new Log("INICIO LEITURA EXCEL TURISMO NACIONAL ESTADO", "SUCESSO", "ARQUIVO"));

                LeitorExcel leitor = new LeitorExcel();
                List<TurismoNacionalEstado> lista = leitor.extrairTurismoNacionalEstado("turismo-rio-de-janeiro.xlsx");

                logs.add(new Log("LEITURA TURISMO NACIONAL ESTADO FINALIZADA", "SUCESSO", "ARQUIVO"));

                System.out.println("Inserindo no banco...");
                logs.add(new Log("INICIO INSERT TURISMO NACIONAL ESTADO", "SUCESSO", "BANCO"));

                try (Connection conn = DriverManager.getConnection(url, usuario, senha);
                     PreparedStatement stmtTempo = conn.prepareStatement(sqlBuscafkTempo);
                     PreparedStatement stmtBuscafkEstado = conn.prepareStatement(sqlBuscafkEstado);
                     PreparedStatement stmtInsert = conn.prepareStatement(sqlInsert)) {

                    conn.setAutoCommit(false);

                    for (TurismoNacionalEstado turismo : lista) {

                        try {
                            stmtTempo.setString(1, turismo.getMes());
                            stmtTempo.setInt(2, turismo.getAno());
                            stmtBuscafkEstado.setString(1, turismo.getEstado().trim());
                            ResultSet resultSetEstado = stmtBuscafkEstado.executeQuery();

                            ResultSet resultSetTempo = stmtTempo.executeQuery();

                            if (!resultSetTempo.next()) {
                                System.out.println("Tempo não encontrado: " + turismo.getMes());
                                logs.add(new Log("TURISMO NACIONAL ESTADO: Tempo não encontrado: " + turismo.getMes(), "FALHA", "BANCO"));
                                continue;
                            }
                            if (!resultSetEstado.next()) {
                                System.out.println("Estado NÃO encontrado: " + turismo.getEstado());
                                logs.add(new Log("TURISMO NACIONAL ESTADO: Município não encontrado: " + turismo.getEstado(), "FALHA", "BANCO"));
                                continue;
                            }

                            int fkTempo = resultSetTempo.getInt("idTempo");
                            int fkEstado = resultSetEstado.getInt("idEstado");

                            stmtInsert.setInt(1, turismo.getQuantidade());
                            stmtInsert.setInt(2, fkTempo);
                            stmtInsert.setInt(3, fkEstado);


                            stmtInsert.addBatch();

                        } catch (Exception e) {
                            System.out.println("Erro: " + e.getMessage());
                        }
                    }

                    stmtInsert.executeBatch();
                    conn.commit();

                    logs.add(new Log("INSERT TURISMO NACIONAL ESTADO FINALIZADO", "SUCESSO", "BANCO"));

                } catch (Exception e) {
                    logs.add(new Log("ERRO GERAL TURISMO NACIONAL ESTADO", "FALHA", "BANCO"));
                    System.out.println(e.getMessage());
                }

                System.out.println("Processo turismo nacional por estado finalizado.");
                System.out.println("==============================================");
                System.out.println();
            }

            // TURISMO INTERNACIONAL POR PAIS
            if(op == 7){

                String sqlBuscafkTempo = "SELECT idTempo FROM tempo WHERE nomeMes = ? AND ano = ?";
                String sqlBuscafkPais = "SELECT idPais FROM paisOrigem WHERE nomePais = ?";
                String sqlInsert = "INSERT INTO chegadaTurismo (quantidade, fkTempo, fkPais) VALUES (?, ?, ?)";

                System.out.println("Lendo Excel...");
                logs.add(new Log("INICIO LEITURA EXCEL TURISMO INTERNACIONAL PAIS", "SUCESSO", "ARQUIVO"));

                LeitorExcel leitor = new LeitorExcel();
                List<TurismoInternacionalPais> lista = leitor.extrairTurismoInternacionalPais("turismo-rio-de-janeiro.xlsx");

                logs.add(new Log("LEITURA TURISMO INTERNACIONAL PAIS FINALIZADA", "SUCESSO", "ARQUIVO"));

                System.out.println("Inserindo no banco...");
                logs.add(new Log("INICIO INSERT TURISMO INTERNACIONAL PAIS", "SUCESSO", "BANCO"));

                try (Connection conn = DriverManager.getConnection(url, usuario, senha);
                     PreparedStatement stmtTempo = conn.prepareStatement(sqlBuscafkTempo);
                     PreparedStatement stmtBuscafkPais = conn.prepareStatement(sqlBuscafkPais);
                     PreparedStatement stmtInsert = conn.prepareStatement(sqlInsert)) {

                    conn.setAutoCommit(false);

                    for (TurismoInternacionalPais turismo : lista) {

                        try {
                            stmtTempo.setString(1, turismo.getMes());
                            stmtTempo.setInt(2, turismo.getAno());
                            stmtBuscafkPais.setString(1, turismo.getPais().trim());
                            ResultSet resultSetPais = stmtBuscafkPais.executeQuery();

                            ResultSet resultSetTempo = stmtTempo.executeQuery();

                            if (!resultSetTempo.next()) {
                                System.out.println("Tempo não encontrado: " + turismo.getMes());
                                logs.add(new Log("TURISMO INTERNACIONAL PAIS: Tempo não encontrado: " + turismo.getMes(), "FALHA", "BANCO"));
                                continue;
                            }
                            if (!resultSetPais.next()) {
                                System.out.println("País NÃO encontrado: " + turismo.getPais());
                                logs.add(new Log("TURISMO INTERNACIONAL PAIS: País não encontrado: " + turismo.getPais(), "FALHA", "BANCO"));
                                continue;
                            }

                            int fkTempo = resultSetTempo.getInt("idTempo");
                            int fkPais = resultSetPais.getInt("idPais");

                            stmtInsert.setInt(1, turismo.getQuantidade());
                            stmtInsert.setInt(2, fkTempo);
                            stmtInsert.setInt(3, fkPais);


                            stmtInsert.addBatch();

                        } catch (Exception e) {
                            System.out.println("Erro: " + e.getMessage());
                        }
                    }

                    stmtInsert.executeBatch();
                    conn.commit();

                    logs.add(new Log("INSERT TURISMO INTERNACIONAL PAIS FINALIZADO", "SUCESSO", "BANCO"));

                } catch (Exception e) {
                    logs.add(new Log("ERRO GERAL TURISMO INTERNACIONAL PAIS", "FALHA", "BANCO"));
                    System.out.println(e.getMessage());
                }

                System.out.println("Processo turismo internacional por pais finalizado.");
                System.out.println("==============================================");
                System.out.println();
            }
        } while(op != 8);
    }
}