package br.com.faztudo.Faz.Tudo.Controller;

import br.com.faztudo.Faz.Tudo.Enums.ConversorDeMedidasEnum;
import br.com.faztudo.Faz.Tudo.Services.ConversorDeMedidasService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/conversordemedidas")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class ConversorDeMedidasController {

    @Autowired
    private ConversorDeMedidasService conversorDeMedidasService;

    @GetMapping
    public double converter(double valor, ConversorDeMedidasEnum origem, ConversorDeMedidasEnum destino){
        return conversorDeMedidasService.converter(valor, origem, destino);
    }
}
