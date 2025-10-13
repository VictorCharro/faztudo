package br.com.faztudo.Faz.Tudo.Services;

import br.com.faztudo.Faz.Tudo.Enums.ConversorDeMedidasEnum;
import org.springframework.stereotype.Service;

@Service
public class ConversorDeMedidasService {

    public double converter(double valor, ConversorDeMedidasEnum origem, ConversorDeMedidasEnum destino){
        if (origem == destino){
            return valor;
        }
        if ((origem == ConversorDeMedidasEnum.CELSIUS || origem == ConversorDeMedidasEnum.FAHRENHEIT)
                && (destino != ConversorDeMedidasEnum.CELSIUS && destino != ConversorDeMedidasEnum.FAHRENHEIT)) {
            throw new IllegalArgumentException("Conversão entre temperatura e comprimento não é permitida.");
        }

        if ((origem != ConversorDeMedidasEnum.CELSIUS && origem != ConversorDeMedidasEnum.FAHRENHEIT)
                && (destino == ConversorDeMedidasEnum.CELSIUS || destino == ConversorDeMedidasEnum.FAHRENHEIT)) {
            throw new IllegalArgumentException("Conversão entre comprimento e temperatura não é permitida.");
        }

        switch (origem) {

            case CENTIMETROS -> {
                if (destino == ConversorDeMedidasEnum.METROS) return valor / 100;
                if (destino == ConversorDeMedidasEnum.QUILOMETROS) return valor / 100000;
                if (destino == ConversorDeMedidasEnum.MILHAS) return valor / 160934;
                return valor;
            }

            case METROS -> {
                if (destino == ConversorDeMedidasEnum.CENTIMETROS) return valor * 100;
                if (destino == ConversorDeMedidasEnum.QUILOMETROS) return valor / 1_000;
                if (destino == ConversorDeMedidasEnum.MILHAS) return valor / 1609.34;
                return valor;
            }

            case QUILOMETROS -> {
                if (destino == ConversorDeMedidasEnum.METROS) return valor * 1_000;
                if (destino == ConversorDeMedidasEnum.CENTIMETROS) return valor * 100000;
                if (destino == ConversorDeMedidasEnum.MILHAS) return valor / 1.60934;
                return valor;
            }

            case MILHAS -> {
                if (destino == ConversorDeMedidasEnum.METROS) return valor * 1609.34;
                if (destino == ConversorDeMedidasEnum.QUILOMETROS) return valor * 1.60934;
                if (destino == ConversorDeMedidasEnum.CENTIMETROS) return valor * 160934;
                return valor;
            }

            case CELSIUS -> {
                if (destino == ConversorDeMedidasEnum.FAHRENHEIT) return (valor * 9 / 5) + 32;
                return valor;
            }

            case FAHRENHEIT -> {
                if (destino == ConversorDeMedidasEnum.CELSIUS) return (valor - 32) * 5 / 9;
                return valor;
            }
            default -> throw new IllegalArgumentException("Conversão inválida entre tipos de unidade.");
        }
    }
}
