package school.sptech;

import org.springframework.jdbc.core.JdbcTemplate;
import school.sptech.database.Conexao;
import school.sptech.model.EstabelecimentoAlimenticio;
import school.sptech.model.Hospedagem;
import school.sptech.model.Log;

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
            System.out.println("Escolha uma opção: ");
            System.out.println("================================================================");
            System.out.println("1 - Ler e Inserir dados de hospedagem");
            System.out.println("2 - Ler e Inserir dados de Estabelecimentos Alimenticios");
            System.out.println("3 - Ler e Inserir dados de Atrativos Turisticos");
            System.out.println("4 - Sair");
            System.out.println("================================================================");
            op = sc.nextInt();

            if(op < 1 || op > 4){
                System.out.println("Digite uma opção válida!!");
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
                            ResultSet rs = stmtBusca.executeQuery();

                            if (!rs.next()) {
                                System.out.println("Município NÃO encontrado: " + hospedagem.getMunicipio());
                                logs.add(new Log("HOSPEDAGEM: Município não encontrado: " + hospedagem.getMunicipio(), "FALHA", "BANCO"));
                                continue;
                            }

                            int fkMunicipio = rs.getInt("idMunicipio");

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
        } while(op != 4);
    }
}