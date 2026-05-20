package school.sptech.model;

public abstract class RegistroTurismo {
    private Integer quantidade;
    private String mes;
    private Integer ano;

    public RegistroTurismo(Integer quantidade, String mes, Integer ano) {
        this.quantidade = quantidade;
        this.mes = mes;
        this.ano = ano;
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
}