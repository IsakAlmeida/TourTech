package school.sptech.database;

import org.springframework.jdbc.datasource.DriverManagerDataSource;

import javax.sql.DataSource;


public class Conexao {
    private DataSource conexao;

    public Conexao() {
        DriverManagerDataSource driver = new DriverManagerDataSource();
        driver.setUsername("root");
        driver.setPassword("AdminTourTech");
        driver.setUrl(
                "jdbc:mysql://ContainerBD:3306/TourTech" +
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
