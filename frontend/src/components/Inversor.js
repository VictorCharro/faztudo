import React, { useState } from 'react';
import './Inversor.css';

const API_URL = process.env.REACT_APP_API_URL;

function Inversor() {
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleInvert = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_URL}/invertertexto`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ texto: inputText }),
      });

      if (!response.ok) {
        throw new Error('Erro ao inverter o texto. Tente novamente.');
      }

      // Converte a resposta JSON
      const data = await response.json();

      // Atualiza o estado com o texto invertido
      setOutputText(data.textoInvertido);

    } catch (err) {
      setError(err.message);
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