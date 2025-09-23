import React, { useState } from 'react';
import './Inversor.css';

// Fallback caso a variável de ambiente não esteja definida
const API_URL = process.env.REACT_APP_API_URL ||
  (process.env.NODE_ENV === 'production'
    ? 'https://faztudo.onrender.com'
    : 'http://localhost:8080');

function Inversor() {
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleInvert = async () => {
    setLoading(true);
    setError(null);
    console.log('Fazendo requisição para:', `${API_URL}/invertertexto`); // Debug

    try {
      const response = await fetch(`${API_URL}/invertertexto`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ texto: inputText }),
      });

      if (!response.ok) {
        throw new Error(`Erro ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      setOutputText(data.textoInvertido);

    } catch (err) {
      console.error('Erro na requisição:', err);
      setError(`Erro ao conectar com o servidor: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="inversor-container">
      <h2>Inversor de Texto</h2>
      <p>Digite seu texto para invertê-lo.</p>

      <textarea
        className="input-area"
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        rows="6"
        placeholder="Digite seu texto aqui..."
      />
      <button onClick={handleInvert} disabled={loading} className="invert-button">
        {loading ? 'Invertendo...' : 'Inverter Texto'}
      </button>

      {error && <p className="error-message">{error}</p>}

      {outputText && (
        <div className="output-section">
          <h3>Texto Invertido</h3>
          <textarea
            className="output-area"
            value={outputText}
            readOnly
            rows="6"
          />
        </div>
      )}
    </div>
  );
}

export default Inversor;