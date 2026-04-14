package school.sptech.model;

public class TurismoNacionalEstado {
    private Integer quantidade;
    private String mes;
    private Integer ano;
    private String estado;

    public TurismoNacionalEstado(Integer quantidade, String mes, Integer ano, String estado) {
        this.quantidade = quantidade;
        this.mes = mes;
        this.ano = ano;
        this.estado = estado;
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

    public String getEstado() {
        return estado;
    }
}
