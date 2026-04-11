package school.sptech.model;

import java.time.LocalDateTime;

public class Log {

    private String dataHora;
    private String evento;
    private String status;
    private String objeto;

    public Log(String evento, String status, String objeto) {
        this.dataHora = LocalDateTime.now().format(java.time.format.DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"));
        this.evento = evento;
        this.status = status;
        this.objeto = objeto;
    }

    public String getDataHora() {
        return dataHora;
    }

    public String getEvento() {
        return evento;
    }

    public String getStatus() {
        return status;
    }

    public String getObjeto() {
        return objeto;
    }

    @Override
    public String toString() {
        return "[" + status + "] " + evento + " (" + objeto + ")";
    }
}