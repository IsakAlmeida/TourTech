package school.sptech.database;

import org.springframework.jdbc.datasource.DriverManagerDataSource;
import javax.sql.DataSource;

public class Conexao {

    private DataSource conexao;

    public Conexao() {

        // DEIXE DESCOMENTADO A BAIXO PARA TESTE ENV
        String host = System.getenv("DB_HOST");
        String database = System.getenv("DB_DATABASE");
        String user = System.getenv("DB_USER");
        String password = System.getenv("DB_PASSWORD");
        String port = System.getenv("DB_PORT");

        // DEIXE DESCOMENTADO A BAIXO PARA TESTE LOCAL
//        String host = "localhost";
//        String database = "TourTech";
//        String user = "root";
//        String password = "@Pipoka12.";
//        String port = "3306";


        DriverManagerDataSource driver = new DriverManagerDataSource();

        driver.setUsername(user);

        driver.setPassword(password);

        driver.setUrl(
                "jdbc:mysql://" + host + ":" + port + "/" + database
        );

        driver.setDriverClassName("com.mysql.cj.jdbc.Driver");

        this.conexao = driver;
    }

    public DataSource getConexao() {
        return this.conexao;
    }
}