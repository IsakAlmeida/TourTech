package school.sptech;

import java.io.IOException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;

public class Slack {
    // TOKEN DO BOT
    private final String TOKEN = System.getenv("SLACK_TOKEN_SUPORTE");
    // CANAL ID SLACK
    private final String CANAL = System.getenv("SLACK_CANAL_SUPORTE");

    public void enviarMensagem(String mensagem) {
        try {
            // SLACK BODY - REQUEST
            String json = """
                    {
                        "channel":"%s",
                        "text":"%s"
                    }
                    """.formatted(CANAL, mensagem.replace("\n", "\\n")
            );

            HttpClient client = HttpClient.newHttpClient();

            HttpRequest request = HttpRequest.newBuilder()
                    // API SLACK
                            .uri(URI.create(
                                    "https://slack.com/api/chat.postMessage"
                            ))
                    // AUTORIZAÇÃO
                            .header(
                                    "Authorization",
                                    "Bearer " + TOKEN
                            )
                    // TIPO DO CONTEUDO
                            .header(
                                    "Content-Type",
                                    "application/json"
                            )
                    // TIPO DO ENVIO
                            .POST(
                                    HttpRequest.BodyPublishers
                                            .ofString(json)
                            )
                            .build();


            HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());

            System.out.println(response.body());

        } catch (IOException e) {
            throw new RuntimeException(e);

        } catch (InterruptedException e) {
            throw new RuntimeException(e);

        }
    }
}
