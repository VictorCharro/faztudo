import React, { useState } from 'react';
import './Contador.css';

function Contador() {
  const [pontosVermelho, setPontosVermelho] = useState(0);
  const [pontosAzul, setPontosAzul] = useState(0);

  const somar = (time) => {
    if (time === 'vermelho') {
      setPontosVermelho(pontosVermelho + 1);
    } else {
      setPontosAzul(pontosAzul + 1);
    }
  };

  const diminuir = (time) => {
    if (time === 'vermelho' && pontosVermelho > 0) {
      setPontosVermelho(pontosVermelho - 1);
    } else if (time === 'azul' && pontosAzul > 0) {
      setPontosAzul(pontosAzul - 1);
    }
  };

  const resetar = () => {
    setPontosVermelho(0);
    setPontosAzul(0);
  };

  return (
    <div className="contador-container">
      <h2>Contador de Pontos</h2>
      <div className="times-container">

        {/* Time Vermelho */}
        <div className="time vermelho">
          <h3>Time Vermelho</h3>
          <p className="pontos">{pontosVermelho}</p>
          <div className="botoes-acao">
            <button className="botao-somar" onClick={() => somar('vermelho')}>+1</button>
            <button className="botao-diminuir" onClick={() => diminuir('vermelho')}>-1</button>
          </div>
        </div>

        {/* Time Azul */}
        <div className="time azul">
          <h3>Time Azul</h3>
          <p className="pontos">{pontosAzul}</p>
          <div className="botoes-acao">
            <button className="botao-somar" onClick={() => somar('azul')}>+1</button>
            <button className="botao-diminuir" onClick={() => diminuir('azul')}>-1</button>
          </div>
        </div>
      </div>

      {/* Botão de Reset */}
      <div className="botoes-reset">
        <button onClick={resetar} className="botao-reset">Resetar Placar</button>
      </div>
    </div>
  );
}

export default Contador;