package school.sptech.model;

public class TurismoInternacionalPais {
    private Integer quantidade;
    private String mes;
    private Integer ano;
    private String pais;

    public TurismoInternacionalPais(Integer quantidade, String mes, Integer ano, String pais) {
        this.quantidade = quantidade;
        this.mes = mes;
        this.ano = ano;
        this.pais = pais;
    }

    public Integer getQuantidade() {
        return quantidade;
    }

    public String getMes() {
        return mes;
    }

    public Integer getAno() {
        return ano;
    }

    public String getPais() {
        return pais;
    }
}
