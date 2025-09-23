package br.com.faztudo.Faz.Tudo.Controller;

import br.com.faztudo.Faz.Tudo.Dtos.inverterTextoRequestDto;
import br.com.faztudo.Faz.Tudo.Dtos.inverterTextoResponseDto;
import br.com.faztudo.Faz.Tudo.Services.inverterTextoService;
import lombok.Data;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequestMapping("/invertertexto")
@Data
@RestController
@CrossOrigin(origins = "*")
public class inverterTextoController {

    @Autowired
    private inverterTextoService inverterTextoService;

    @PostMapping
    public inverterTextoResponseDto inverter (@RequestBody inverterTextoRequestDto dto){
        return inverterTextoService.inverterTexto(dto);
    }
}
