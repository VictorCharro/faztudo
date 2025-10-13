package br.com.faztudo.Faz.Tudo.Services;

import br.com.faztudo.Faz.Tudo.Dtos.InverterTextoRequestDto;
import br.com.faztudo.Faz.Tudo.Dtos.InverterTextoResponseDto;
import lombok.Data;
import org.springframework.stereotype.Service;

@Service
@Data
public class InverterTextoService {

    public InverterTextoResponseDto inverterTexto(InverterTextoRequestDto texto){
        StringBuilder invertido = new StringBuilder();

        for (int i = texto.getTexto().length(); i > 0; i--){
            invertido.append(texto.getTexto().charAt(i - 1));
        }

        InverterTextoResponseDto response = new InverterTextoResponseDto();
        response.setTextoInvertido(invertido.toString());
        return response;
    }
}
