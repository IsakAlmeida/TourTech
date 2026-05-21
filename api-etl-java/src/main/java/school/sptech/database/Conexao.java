package school.sptech.database;

import org.springframework.jdbc.datasource.DriverManagerDataSource;

import javax.sql.DataSource;

public class Conexao {

    private DataSource conexao;

    public Conexao() {

        String host = System.getenv("DB_HOST");
        String database = System.getenv("DB_DATABASE");
        String user = System.getenv("DB_USER");
        String password = System.getenv("DB_PASSWORD");
        String port = System.getenv("DB_PORT");

        DriverManagerDataSource driver = new DriverManagerDataSource();

        driver.setUsername(user);

        driver.setPassword(password);

        driver.setUrl(
                "jdbc:mysql://" + host + ":" + port + "/" + database +
                        "?useUnicode=true" +
                        "&characterEncoding=UTF-8" +
                        "&connectionCollation=utf8mb4_unicode_ci" +
                        "&serverTimezone=UTC"
        );

        driver.setDriverClassName("com.mysql.cj.jdbc.Driver");

        this.conexao = driver;
    }

    public DataSource getConexao() {
        return this.conexao;
    }
}