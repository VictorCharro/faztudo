import React, { useState } from "react";
import './GeradorSenha.css';

function GeradorSenha() {
    const [tamanho, setTamanho] = useState('');
    const [senha, setSenha] = useState("");
    const [usarMaiusculas, setUsarMaiusculas] = useState(true);
    const [usarMinusculas, setUsarMinusculas] = useState(true);
    const [usarNumeros, setUsarNumeros] = useState(true);
    const [usarSimbolos, setUsarSimbolos] = useState(true);

    const gerarSenha = () => {
        let caracteres = "";

        if (usarMaiusculas) caracteres += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        if (usarMinusculas) caracteres += "abcdefghijklmnopqrstuvwxyz";
        if (usarNumeros) caracteres += "0123456789";
        if (usarSimbolos) caracteres += "!@#$%^&*()_+~`|}{[]:;?><,./-=";

        let novaSenha = "";
        for (let i = 0; i < tamanho; i++) {
            const indice = Math.floor(Math.random() * caracteres.length);
            novaSenha += caracteres.charAt(indice);
        }
        setSenha(novaSenha);
    };
    return (
        <div className="gerador-senha-container">
            <h2>Gerador de Senhas</h2>
            <div className="input-group">
                <label htmlFor="tamanho">Tamanho da Senha:</label>
                <input
                    type="number"
                    id="tamanho"
                    className="input-tamanho-senha"
                    value={tamanho}
                    onChange={(e) => setTamanho(e.target.value)}
                    placeholder="Escolha o tamanho"
                    min="4"
                    max="64"
                />
            </div>

            <ul className="checkbox-list">
                <li>
                    <label>
                        <input
                            type="checkbox"
                            checked={usarMaiusculas}
                            onChange={(e) => setUsarMaiusculas(e.target.checked)}
                        />
                        Incluir letras maiúsculas
                    </label>
                </li>

                <li>
                    <label>
                        <input
                            type="checkbox"
                            checked={usarMinusculas}                       // <- usar o estado certo
                            onChange={(e) => setUsarMinusculas(e.target.checked)}
                        />
                        Incluir letras minúsculas
                    </label>
                </li>
</ul>
<ul className="checkbox-list">
                <li>
                    <label>
                        <input
                            type="checkbox"
                            checked={usarNumeros}                       // <- usar o estado certo
                            onChange={(e) => setUsarNumeros(e.target.checked)}
                        />
                        Incluir Números
                    </label>
                </li>

                <li>
                    <label>
                        <input
                            type="checkbox"
                            checked={usarSimbolos}                       // <- usar o estado certo
                            onChange={(e) => setUsarSimbolos(e.target.checked)}
                        />
                        Incluir Simbolos
                    </label>
                </li>

            </ul>

            <button onClick={gerarSenha} className="generate-button">Gerar Senha</button>
            {senha && (
                <div className="result">
                    <h3>Senha Gerada:</h3>
                    <p className="generated-password">{senha}</p>
                </div>
            )}
        </div>
    );
}
export default GeradorSenha;