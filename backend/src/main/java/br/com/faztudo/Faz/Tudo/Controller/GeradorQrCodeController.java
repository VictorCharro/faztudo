package br.com.faztudo.Faz.Tudo.Controller;

import br.com.faztudo.Faz.Tudo.Services.GeradorQrCodeService;
import lombok.Data;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/qrcode")
@CrossOrigin(origins = "*")
@Data
public class GeradorQrCodeController {

    @Autowired
    private GeradorQrCodeService qrCodeService;

    @GetMapping(produces = MediaType.IMAGE_PNG_VALUE)
    public ResponseEntity<InputStreamResource> gerarQrCode(
            @RequestParam String text,
            @RequestParam(required = false) String scale,
            @RequestParam(required = false) String error_level,
            @RequestParam(required = false) String foreground,
            @RequestParam(required = false) String background) {

        try {
            // Todos os parâmetros são passados para o Service
            InputStreamResource resource = qrCodeService.gerarQrCode(text, scale, error_level, foreground, background);

            return ResponseEntity.ok()
                    .header(HttpHeaders.CONTENT_DISPOSITION, "inline; filename=qrcode.png")
                    .contentType(MediaType.IMAGE_PNG)
                    .body(resource);
        } catch (Exception e) {
            // Lidar com o erro
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
