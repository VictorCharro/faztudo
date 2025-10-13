package br.com.faztudo.Faz.Tudo.Services;

import org.springframework.core.io.InputStreamResource;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import java.io.ByteArrayInputStream;

@Service
public class GeradorQrCodeService {

    private final RestTemplate restTemplate;
    private final String token = "21977|58yEtjgJg1i2gCvOg1eutWQPn9hHvNyR";

    public GeradorQrCodeService(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    public InputStreamResource gerarQrCode(String text, String scale, String errorLevel, String foreground, String background) {
        try {
            String url = construirUrl(text, scale, errorLevel, foreground, background);

            System.out.println("URL da API: " + url); // Para debug

            // Usar ResponseEntity<byte[]> para dados binários
            ResponseEntity<byte[]> response = restTemplate.getForEntity(url, byte[].class);

            if (response.getStatusCode().is2xxSuccessful() && response.getBody() != null) {
                byte[] imageBytes = response.getBody();
                return new InputStreamResource(new ByteArrayInputStream(imageBytes));
            } else {
                throw new RuntimeException("Erro na resposta da API: " + response.getStatusCode());
            }
        } catch (Exception e) {
            System.err.println("Erro ao gerar QR Code: " + e.getMessage());
            e.printStackTrace();
            throw new RuntimeException("Erro ao gerar QR Code: " + e.getMessage(), e);
        }
    }

    private String construirUrl(String text, String scale, String errorLevel, String foreground, String background) {
        UriComponentsBuilder builder = UriComponentsBuilder
                .fromHttpUrl("https://api.invertexto.com/v1/qrcode")
                .queryParam("token", token)
                .queryParam("text", text);

        // Valores padrão se não informados
        builder.queryParam("scale", scale != null && !scale.isEmpty() ? scale : "5");
        builder.queryParam("error_level", errorLevel != null && !errorLevel.isEmpty() ? errorLevel : "L");

        if (foreground != null && !foreground.isEmpty()) {
            // Remove # se existir e limpa espaços
            String cor = foreground.trim().startsWith("#") ? foreground.trim().substring(1) : foreground.trim();
            // Se não foi informada cor, usa preto como padrão
            builder.queryParam("foreground", cor.isEmpty() ? "black" : cor);
        } else {
            builder.queryParam("foreground", "black"); // Preto padrão
        }

        if (background != null && !background.isEmpty()) {
            // Remove # se existir e limpa espaços
            String cor = background.trim().startsWith("#") ? background.trim().substring(1) : background.trim();
            // Se não foi informada cor, usa branco como padrão
            builder.queryParam("background", cor.isEmpty() ? "FFFFFF" : cor);
        } else {
            builder.queryParam("background", "FFFFFF"); // Branco padrão
        }
        System.out.println("URL da API: " + builder.build().toUriString());
        return builder.build().toUriString();
    }
}