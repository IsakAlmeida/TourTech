package school.sptech;

import school.sptech.database.Conexao;
import school.sptech.dto.SuporteDto;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;

public class Main {

    public static void main(String[] args) {

        try {
            Conexao conexaoBanco = new Conexao();
            Connection conexao = conexaoBanco.getConexao().getConnection();


            //------------- CHAMADOS DE SUPORTE------------

            String sqlChamado = """
                    SELECT
                        idChamado,
                        nomeCompleto,
                        email,
                        situacao,
                        descricao
                    FROM chamadoSuporte
                    """;

            PreparedStatement ps = conexao.prepareStatement(sqlChamado);
            ResultSet resultatoSlack = ps.executeQuery();

            Slack slack = new Slack();

            while (resultatoSlack.next()) {

                SuporteDto chamado = new SuporteDto();

                chamado.setIdChamado(
                        resultatoSlack.getInt("idChamado")
                );

                chamado.setNomeCompleto(
                        resultatoSlack.getString("nomeCompleto")
                );

                chamado.setEmail(
                        resultatoSlack.getString("email")
                );

                chamado.setSituacao(
                        resultatoSlack.getString("situacao")
                );

                chamado.setDescricao(
                        resultatoSlack.getString("descricao")
                );

                String mensagemChamado = """
                        Novo chamado de suporte
                        
                        ID do chamado: %d
                        Nome: %s
                        Email: %s
                        Situação: %s
                        Descrição: %s
                        """.formatted(
                        chamado.getIdChamado(),
                        chamado.getNomeCompleto(),
                        chamado.getEmail(),
                        chamado.getSituacao(),
                        chamado.getDescricao()
                );

                slack.enviarMensagem(mensagemChamado);
            }

            //------------- ALERTA PACOTE ------------

                String sqlPacotes = """
                    SELECT 
                        COUNT(*) AS total
                    FROM pacote
                    WHERE MONTH(dataCriacao) = MONTH(CURRENT_DATE())
                    AND YEAR(dataCriacao) = YEAR(CURRENT_DATE())
                    """;

                PreparedStatement psPacotes = conexao.prepareStatement(sqlPacotes);
                ResultSet resultadoPacotes = psPacotes.executeQuery();

                PacotesSlack pacoteSlack = new PacotesSlack();

                if (resultadoPacotes.next()) {

                    Integer totalPacotes = resultadoPacotes.getInt("total");

                    System.out.println("Pacotes do mês: " + totalPacotes);

                    //Verificação quantia de pacotes
                    if (totalPacotes < 5) {

                        String mensagemPacote = """
                            ALERTA TOURTECH

                            Existem apenas %d pacotes
                            cadastrados neste mês.

                            Quantidade mínima esperada: 5.
                            """.formatted(totalPacotes);

                        pacoteSlack.enviarMensagem(mensagemPacote);

                        System.out.println("Alerta enviado ao Slack!");

                    } else {

                        System.out.println("Quantidade de pacotes OK.");
                    }
                }

                conexao.close();

            } catch (Exception e) {

                e.printStackTrace();
            }
        }
    }