package school.sptech.model;

public class Atrativos {
    private String nome;
    private String categoria;
    private Municipio municipio;

    public Atrativos(String nome, String categoria, Municipio municipio) {
        this.nome = nome;
        this.categoria = categoria;
        this.municipio = municipio;
    }

    public String getNome() {
        return nome;
    }

    public String getCategoria() {
        return categoria;
    }

    public String getMunicipio() {
        return municipio.getNome();
    }
}
