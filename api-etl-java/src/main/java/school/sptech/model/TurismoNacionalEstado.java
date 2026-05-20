package school.sptech.model;

public class TurismoNacionalEstado extends RegistroTurismo {
    private String estado;

    public TurismoNacionalEstado(Integer quantidade, String mes, Integer ano, String estado) {
        super(quantidade, mes, ano);
        this.estado = estado;
    }

    public String getEstado() {
        return estado;
    }
}