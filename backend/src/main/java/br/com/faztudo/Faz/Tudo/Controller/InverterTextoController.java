package br.com.faztudo.Faz.Tudo.Controller;

import br.com.faztudo.Faz.Tudo.Dtos.InverterTextoRequestDto;
import br.com.faztudo.Faz.Tudo.Dtos.InverterTextoResponseDto;
import br.com.faztudo.Faz.Tudo.Services.InverterTextoService;
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
public class InverterTextoController {

    @Autowired
    private InverterTextoService inverterTextoService;

    @PostMapping
    public InverterTextoResponseDto inverter (@RequestBody InverterTextoRequestDto dto){
        return inverterTextoService.inverterTexto(dto);
    }
}
