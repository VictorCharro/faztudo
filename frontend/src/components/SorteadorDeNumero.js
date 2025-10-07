import React, { useState } from "react";
import './SorteadorDeNumero.css';

function SorteadorDeNumero() {
    const [valorMinimo, setValorMinimo] = useState('');
    const [valorMaximo, setValorMaximo] = useState('');
    const [numeroSorteado, setNumeroSorteado] = useState(null);

    return (
        <div className="sorteador-container">
            <h2>Sorteador de Números</h2>
            <p>Digite os valores mínimo e máximo para sortear um número:</p>

            <div>
                <div className="sorteador-bloco">
                    <label>Valor Mínimo:</label>
                    <input
                        type="number"
                        placeholder="Valor Mínimo"
                        value={valorMinimo}
                        className="input-minimo"
                        onChange={(e) => setValorMinimo(e.target.value)}
                    />
                </div>

                <div className="sorteador-bloco">
                    <label>Valor Máximo:</label>
                    <input
                        type="number"
                        placeholder="Valor Máximo"
                        value={valorMaximo}
                        className="input-maximo"
                        onChange={(e) => setValorMaximo(e.target.value)}
                    />
                </div>
            </div>


            <button
                onClick={() => {
                    const min = parseInt(valorMinimo, 10);
                    const max = parseInt(valorMaximo, 10);
                    if (!isNaN(min) && !isNaN(max) && min <= max) {
                        const numero = Math.floor(Math.random() * (max - min + 1)) + min;
                        setNumeroSorteado(numero);
                    } else {
                        alert('Por favor, insira valores válidos. O valor mínimo deve ser menor que o valor máximo.');
                    }
                }}
            >
                Sortear Número
            </button>

            {numeroSorteado !== null && (
                <div className="resultado">
                    <h3>Número Sorteado: {numeroSorteado}</h3>
                </div>
            )}
        </div>
    );
}
export default SorteadorDeNumero;