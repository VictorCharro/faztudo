import React, { useState } from 'react';
import './GeradorQrCode.css';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080';

function GeradorQrCode() {
  const [text, setText] = useState(''); 
  const [scale, setScale] = useState('5'); 
  const [errorLevel, setErrorLevel] = useState('L'); 
  const [foreground, setForeground] = useState('');
  const [background, setBackground] = useState('');

  const [qrCodeUrl, setQrCodeUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleGerarQrCode = async () => {
    setLoading(true);
    setError(null);
    setQrCodeUrl(null);

    if (qrCodeUrl) {
      URL.revokeObjectURL(qrCodeUrl);
    }

    const url = new URL(`${API_URL}/qrcode`);
    url.searchParams.append('text', text);
    url.searchParams.append('scale', scale || '5');
    url.searchParams.append('error_level', errorLevel || 'L');
    url.searchParams.append('foreground', foreground ? foreground.replace('#', '') : 'black');
    url.searchParams.append('background', background ? background.replace('#', '') : 'FFFFFF');

    console.log('URL sendo chamada:', url.toString());

    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Accept': 'image/png',
        }
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Erro ${response.status}: ${errorText || 'Erro ao gerar o QR Code'}`);
      }

      const blob = await response.blob();

      // Verificar se realmente recebemos uma imagem
      if (blob.type && !blob.type.startsWith('image/')) {
        throw new Error('Resposta não é uma imagem válida');
      }

      const imageUrl = URL.createObjectURL(blob);
      setQrCodeUrl(imageUrl);

    } catch (err) {
      console.error('Erro ao gerar QR Code:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    return () => {
      if (qrCodeUrl) {
        URL.revokeObjectURL(qrCodeUrl);
      }
    };
  }, [qrCodeUrl]);

  return (
    <div className="qrcode-container">
      <h2>Gerador de QR Code</h2>
      <div className="form-e-resultado">
        <div className="form-qr">
          <label>Tamanho</label>
          <select value={scale} onChange={(e) => setScale(e.target.value)}>
            {[...Array(10).keys()].map(i => (
              <option key={i + 1} value={i + 1}>{i + 1}</option>
            ))}
          </select>

          <label>Nível de erro</label>
          <select value={errorLevel} onChange={(e) => setErrorLevel(e.target.value)}>
            <option value="L">L (7%)</option>
            <option value="M">M (15%)</option>
            <option value="Q">Q (25%)</option>
            <option value="H">H (30%)</option>
          </select>

          <label>Cor (aceita hexadecimal)</label>
          <input
            type="text"
            value={foreground}
            onChange={(e) => setForeground(e.target.value)}
            placeholder="Ex: black ou #000000"
          />

          <label>Cor do fundo (aceita hexadecimal)</label>
          <input
            type="text"
            value={background}
            onChange={(e) => setBackground(e.target.value)}
            placeholder="Ex: white ou #FFFFFF"
          />

          <label>Texto</label>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows="5"
            placeholder="Digite o texto ou URL para o QR Code..."
          />

          <button
            onClick={handleGerarQrCode}
            disabled={loading || !text.trim()}
            className="gerar-botao"
          >
            {loading ? 'Gerando...' : 'Gerar Imagem'}
          </button>
        </div>

        <div className="resultado-qr">
          <h3>Resultado:</h3>
          {error && <p className="error-message">{error}</p>}
          {loading && <p>Gerando QR Code...</p>}
          {qrCodeUrl && (
            <div className="imagem-container">
              <img src={qrCodeUrl} alt="QR Code gerado" className="qr-code-imagem"/>
              <a href={qrCodeUrl} download="qrcode.png" className="download-link">
                Baixar Imagem
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default GeradorQrCode;