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


            String sql = """
                    SELECT
                        idChamado,
                        nomeCompleto,
                        email,
                        situacao,
                        descricao
                    FROM chamadoSuporte
                    """;

            PreparedStatement ps =
                    conexao.prepareStatement(sql);

            ResultSet rs = ps.executeQuery();

            Slack slack =
                    new Slack();

            while (rs.next()) {

                SuporteDto chamado = new SuporteDto();

                chamado.setIdChamado(
                        rs.getInt("idChamado")
                );

                chamado.setNomeCompleto(
                        rs.getString("nomeCompleto")
                );

                chamado.setEmail(
                        rs.getString("email")
                );

                chamado.setSituacao(
                        rs.getString("situacao")
                );

                chamado.setDescricao(
                        rs.getString("descricao")
                );

                String mensagem = """
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

                slack.enviarMensagem(mensagem);
            }

            conexao.close();

        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}