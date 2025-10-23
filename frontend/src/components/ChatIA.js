import React, { useState } from "react";
import "./ChatIA.css";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:8080";

function ChatIA() {
  const [mensagem, setMensagem] = useState("");
  const [resposta, setResposta] = useState("");
  const [loading, setLoading] = useState(false);

  const handleEnviar = async () => {
    if (!mensagem.trim()) return;

    setLoading(true);
    setResposta("");

    try {
      const res = await fetch(`${API_URL}/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mensagem: mensagem }), // ✅ Corrigido para enviar objeto
      });

      const data = await res.text();
      setResposta(data);
    } catch (err) {
      setResposta("Erro ao se comunicar com o servidor.");
    } finally {
      setLoading(false);
    }
  };

  const formatarResposta = (texto) => {
    if (!texto) return null;

    const linhas = texto.split('\n');
    
    return linhas.map((linha, index) => {
      if (linha.startsWith('###')) {
        return <h3 key={index} className="resposta-titulo">{linha.replace(/###\s*/g, '')}</h3>;
      }
      
      if (linha.includes('**')) {
        const partes = linha.split(/\*\*(.+?)\*\*/g);
        return (
          <p key={index}>
            {partes.map((parte, i) => 
              i % 2 === 1 ? <strong key={i}>{parte}</strong> : parte
            )}
          </p>
        );
      }
      
      if (linha.trim() === '') {
        return <br key={index} />;
      }
      
      return <p key={index}>{linha}</p>;
    });
  };

  return (
    <div className="chat-container">
      <h2><img src="https://img.icons8.com/?size=100&id=5jpTi28s5yE1&format=png&color=667eea"width="35"height="35"/> Assistente FazTudo</h2>
      <textarea
        value={mensagem}
        onChange={(e) => setMensagem(e.target.value)}
        placeholder="Digite sua pergunta..."
        className="chat-input"
        onKeyPress={(e) => {
          if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleEnviar();
          }
        }}
      />
      <button onClick={handleEnviar} disabled={loading} className="chat-button">
        {loading ? "Pensando..." : "Enviar"}
      </button>

      {resposta && (
        <div className="chat-response">
          <strong>Resposta:</strong>
          <div className="resposta-conteudo">
            {formatarResposta(resposta)}
          </div>
        </div>
      )}
    </div>
  );
}

export default ChatIA;