package br.com.faztudo.Faz.Tudo.Services;

import br.com.faztudo.Faz.Tudo.Dtos.inverterTextoRequestDto;
import br.com.faztudo.Faz.Tudo.Dtos.inverterTextoResponseDto;
import lombok.Data;
import org.springframework.stereotype.Service;

@Service
@Data
public class inverterTextoService {

    public inverterTextoResponseDto inverterTexto(inverterTextoRequestDto texto){
        StringBuilder invertido = new StringBuilder();

        for (int i = texto.getTexto().length(); i > 0; i--){
            invertido.append(texto.getTexto().charAt(i - 1));
        }

        inverterTextoResponseDto response = new inverterTextoResponseDto();
        response.setTextoInvertido(invertido.toString());
        return response;
    }
}
