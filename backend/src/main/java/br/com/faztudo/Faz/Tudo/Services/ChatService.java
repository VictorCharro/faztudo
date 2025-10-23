package br.com.faztudo.Faz.Tudo.Services;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.List;
import java.util.Map;

@Service
public class ChatService {

    private String GEMINI_API_KEY = "AIzaSyC2xkgrfSPrEFbmt0F4VfwXRVegq0_U108";

    private static final String GEMINI_URL =
            "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=";

    public String enviarMensagem(String mensagem) {
        RestTemplate restTemplate = new RestTemplate();
        String url = GEMINI_URL + GEMINI_API_KEY;

        String body = String.format(
                "{\"contents\":[{\"parts\":[{\"text\":\"%s\"}]}]}",
                mensagem.replace("\"", "\\\"").replace("\n", "\\n").replace("\r", "")
        );

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        HttpEntity<String> request = new HttpEntity<>(body, headers);

        try {
            ResponseEntity<Map> response = restTemplate.exchange(
                    url,
                    HttpMethod.POST,
                    request,
                    Map.class
            );

            Map<String, Object> responseBody = response.getBody();

            if (responseBody != null && responseBody.containsKey("candidates")) {
                List<Map<String, Object>> candidates =
                        (List<Map<String, Object>>) responseBody.get("candidates");

                if (!candidates.isEmpty()) {
                    Map<String, Object> content =
                            (Map<String, Object>) candidates.get(0).get("content");

                    List<Map<String, Object>> parts =
                            (List<Map<String, Object>>) content.get("parts");

                    if (!parts.isEmpty()) {
                        String textoResposta = (String) parts.get(0).get("text");
                        return limparResposta(textoResposta);
                    }
                }
            }

            return "Resposta inválida da API";

        } catch (Exception e) {
            e.printStackTrace();
            return "Erro ao processar resposta da API Gemini: " + e.getMessage();
        }
    }

    // Método de limpeza robusta
    private String limparResposta(String texto) {
        if (texto == null || texto.isEmpty()) return "";

        // Remove QUALQUER coisa que pareça marcador de código
        texto = texto.replaceAll("```[a-zA-Z]*\\s*", ""); // Remove ```json, ```javascript, etc
        texto = texto.replaceAll("```", ""); // Remove ``` soltos
        texto = texto.replaceAll("\"\"\"[a-zA-Z]*\\s*", ""); // Remove """json
        texto = texto.replaceAll("\"\"\"", ""); // Remove """ soltos

        // Remove linhas que só contém esses marcadores
        String[] linhas = texto.split("\n");
        StringBuilder resultado = new StringBuilder();

        for (String linha : linhas) {
            String linhaTrim = linha.trim();
            // Ignora linhas que são só marcadores de código
            if (!linhaTrim.matches("^[`\"']{3,}.*") && !linhaTrim.isEmpty()) {
                resultado.append(linha).append("\n");
            }
        }

        return resultado.toString().trim();
    }
}