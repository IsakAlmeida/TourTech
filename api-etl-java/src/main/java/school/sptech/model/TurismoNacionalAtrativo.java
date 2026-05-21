package school.sptech.model;

public class TurismoNacionalAtrativo extends RegistroTurismo {
    private String atrativo;

    public TurismoNacionalAtrativo(Integer quantidade, String mes, Integer ano, String atrativo) {
        super(quantidade, mes, ano);
        this.atrativo = atrativo;
    }

    public String getAtrativo() {
        return atrativo;
    }
}