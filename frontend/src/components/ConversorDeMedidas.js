import React from 'react';
import './ConversorDeMedidas.css';

const API_URL = process.env.REACT_APP_API_URL ||
    (process.env.NODE_ENV === 'production'
        ? 'https://faztudo.onrender.com'
        : 'http://localhost:8080');

function ConversorDeMedidas() {
    const [valor, setValor] = React.useState('');
    const [unidadeOrigem, setUnidadeOrigem] = React.useState('QUILOMETROS');
    const [unidadeDestino, setUnidadeDestino] = React.useState('METROS');
    const [resultado, setResultado] = React.useState('');
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState(null);

    const handleConverter = async () => {
        setLoading(true);
        setError(null);
        
        try {
            const url = `${API_URL}/conversordemedidas?valor=${valor}&origem=${unidadeOrigem}&destino=${unidadeDestino}`;
            console.log('Fazendo requisição para:', url);

            const response = await fetch(url);

            if (!response.ok) {
                throw new Error(`Erro ${response.status}: ${response.statusText}`);
            }

            const data = await response.text();
            setResultado(parseFloat(data).toFixed(4).replace('.', ','));

        } catch (err) {
            setError(`Digite o valor e selecione as unidades corretamente.`);
        } finally {
            setLoading(false);
        }
    };
    return (
        <div className="conversor-container">
            <h2>Conversor de Medidas</h2>
            <p className='embaixo-titulo'>Converta unidades de medida facilmente.</p>

            <input
                type="number"
                value={valor}
                onChange={(e) => setValor(e.target.value)}
                placeholder="Digite o valor"
                className="input-conversordemedidas"
            />

            <label>De:</label>
            <select
                value={unidadeOrigem}
                onChange={(e) => setUnidadeOrigem(e.target.value)}
                className="select-conversordemedidas"
            >
                <option value="CENTIMETROS">Centímetros</option>
                <option value="METROS">Metros</option>
                <option value="QUILOMETROS">Quilômetros</option>
                <option value="MILHAS">Milhas</option>
                <option value="CELSIUS">Celsius</option>
                <option value="FAHRENHEIT">Fahrenheit</option>
            </select>

            <span className="to-label">↓</span>

            <label>Para:</label>
            <select
                value={unidadeDestino}
                onChange={(e) => setUnidadeDestino(e.target.value)}
                className="select-conversordemedidas"
            >
                <option value="CENTIMETROS">Centímetros</option>
                <option value="METROS">Metros</option>
                <option value="QUILOMETROS">Quilômetros</option>
                <option value="MILHAS">Milhas</option>
                <option value="CELSIUS">Celsius</option>
                <option value="FAHRENHEIT">Fahrenheit</option>
            </select>
            
            <button onClick={handleConverter} disabled={loading} className="convert-button">
                {loading ? 'Convertendo...' : 'Converter'}
            </button>

            {error && <p className="error-message">{error}</p>}

            {resultado && (
                <div className="resultado-section">
                    <h3>Resultado da Conversão</h3>
                    <p className="resultado-conversordemedidas">{resultado}</p>
                </div>
            )}
        </div>
    );
}
export default ConversorDeMedidas;