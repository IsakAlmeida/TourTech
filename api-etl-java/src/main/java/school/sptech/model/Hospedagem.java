package school.sptech.model;

public class Hospedagem extends EstabelecimentoTuristico {
    public Hospedagem(String nome, String categoria, String endereco,
                      Boolean multilingue, String municipio,
                      String contato, String emailComercial) {
        super(nome, categoria, endereco, multilingue, municipio, contato, emailComercial);
    }
}