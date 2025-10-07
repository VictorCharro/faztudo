import React from "react";
import './CalculadoraIMC.css';

function CalculadoraIMC() {
    const [peso, setPeso] = React.useState("");
    const [altura, setAltura] = React.useState("");
    const [imc, setImc] = React.useState(null);

    const calcularIMC = () => {
        if (peso > 0 && altura > 0) {
            setImc(peso / ((altura / 100) * (altura / 100)));
        }
    };

    return (
        <div
        className="calculadora-imc-container">
            <h2>Calculadora de IMC</h2>
            <div className="input-peso-altura-imc">
                <label>Peso (kg):</label>
                <input
                    type="number"
                    value={peso}
                    onChange={(e) => setPeso(e.target.value)}
                    placeholder="Ex: 70"
                />
            </div>
            <div className="input-peso-altura-imc">
                <label>Altura (cm):</label>
                <input
                    type="number"
                    value={altura}
                    onChange={(e) => setAltura(e.target.value)}
                    placeholder="Ex: 170"
                />
            </div>
            <button onClick={calcularIMC} className="botao-calcular-imc">Calcular IMC</button>
            {imc && (
                <div className="resultado-imc">
                    <h3>Seu IMC é: {imc.toFixed(2)}</h3>
                    <p>{
                        imc < 18.5
                            ? "Abaixo do peso"
                            : imc < 24.9
                                ? "Peso normal"
                                : imc < 29.9
                                    ? "Sobrepeso"
                                    : "Obesidade"
                    }</p>
                </div>
            )}
        </div>
    );
}
export default CalculadoraIMC;
