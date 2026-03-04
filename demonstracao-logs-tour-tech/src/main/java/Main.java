import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.concurrent.ThreadLocalRandom;

public class Main {
    public static void main(String[] args) throws InterruptedException{

        String[] eventos = {
                "[Usuário X] [Acesso ao sistema]",
                "[Usuário X] [Consulta ao dashboard]",
                "[Usuário X] [Filtro aplicado: destinos em alta]",
                "[Usuário X] [Exportação de relatório]",
                "[Usuário X] [Atualização de dados]",
                "[Usuário X] [Logout realizado]"
        };

        DateTimeFormatter formatoDia = DateTimeFormatter.ofPattern("dd/MM/yyyy");
        DateTimeFormatter formatoHora = DateTimeFormatter.ofPattern("HH:mm:ss");
        Integer id = 1;
        while (true) {
            String dia = LocalDateTime.now().format(formatoDia);
            String horario = LocalDateTime.now().format(formatoHora);
            Integer aleatorio = ThreadLocalRandom.current().nextInt(0, 6);
            String evento = eventos[aleatorio];

            System.out.println("["+ (id++) + "] " +"["+ dia + "] " + "[" + horario + "] " + evento);


            Thread.sleep(2000);
        }
    }
}
