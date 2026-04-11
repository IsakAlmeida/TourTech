package school.sptech.model;

public class EstabelecimentoAlimenticio {
    private String nome;
    private String categoria;
    private String endereco;
    private Boolean multilingue;
    private String municipio;
    private String contato;
    private String emailComercial;

    public EstabelecimentoAlimenticio(String nome, String categoria, String endereco, Boolean multilingue, String municipio, String contato, String emailComercial) {
        this.nome = nome;
        this.categoria = categoria;
        this.endereco = endereco;
        this.multilingue = multilingue;
        this.municipio = municipio;
        this.contato = contato;
        this.emailComercial = emailComercial;
    }

    public String getNome() {
        return nome;
    }

    public String getCategoria() {
        return categoria;
    }

    public String getEndereco() {
        return endereco;
    }

    public Boolean getMultilingue() {
        return multilingue;
    }

    public String getMunicipio() {
        return municipio;
    }

    public String getContato() {
        return contato;
    }

    public String getEmailComercial() {
        return emailComercial;
    }
}
