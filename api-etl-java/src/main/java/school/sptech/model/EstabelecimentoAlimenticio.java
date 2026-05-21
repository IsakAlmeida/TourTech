package school.sptech.model;

public class EstabelecimentoAlimenticio extends EstabelecimentoTuristico {
    public EstabelecimentoAlimenticio(String nome, String categoria, String endereco,
                                      Boolean multilingue, String municipio,
                                      String contato, String emailComercial) {
        super(nome, categoria, endereco, multilingue, municipio, contato, emailComercial);
    }
}