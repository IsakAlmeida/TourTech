package school.sptech.model;

public class Atrativos {
    private String nome;
    private String categoria;
    private String Municipio;

    public Atrativos(String nome, String categoria, String municipio) {
        this.nome = nome;
        this.categoria = categoria;
        Municipio = municipio;
    }

    public String getNome() {
        return nome;
    }

    public String getCategoria() {
        return categoria;
    }

    public String getMunicipio() {
        return Municipio;
    }
}
