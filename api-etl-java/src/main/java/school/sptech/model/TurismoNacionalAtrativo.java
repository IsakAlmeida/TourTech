package school.sptech.model;

public class TurismoNacionalAtrativo {
    private Integer quantidade;
    private String mes;
    private Integer ano;
    private String atrativo;

    public TurismoNacionalAtrativo(Integer quantidade, String mes, Integer ano, String atrativo) {
        this.quantidade = quantidade;
        this.mes = mes;
        this.ano = ano;
        this.atrativo = atrativo;
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

    public String getAtrativo() {
        return atrativo;
    }
}
