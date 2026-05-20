package school.sptech.model;

public class TurismoInternacionalPais extends RegistroTurismo {
    private String pais;

    public TurismoInternacionalPais(Integer quantidade, String mes, Integer ano, String pais) {
        super(quantidade, mes, ano);
        this.pais = pais;
    }

    public String getPais() {
        return pais;
    }
}