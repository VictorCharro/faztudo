import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';

import Inversor from './components/Inversor';
import Contador from './components/Contador';
import GeradorQrCode from './components/GeradorQrCode';
import SorteadorDeNumero from './components/SorteadorDeNumero';
import GeradorSenha from './components/GeradorSenha';

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header-custom">
          <Link to="/">
            <h1>Faz Tudo</h1>
          </Link>
        </header>

        <main className="App-main-content">
          <Routes>
            <Route path="/inversor" element={<Inversor />} />
            <Route path="/contador" element={<Contador />} />
            <Route path="/geradorqrcode" element={<GeradorQrCode />} />
            <Route path="/sorteadordenumero" element={<SorteadorDeNumero />} />
            <Route path="/geradorsenha" element={<GeradorSenha />} />
            <Route
              path="/"
              element={
                <div>
                  <h2>Bem-vindo ao Faz Tudo!</h2>
                  <p>Escolha uma ferramenta no menu para começar.</p>
                  <nav>
                    <ul className="App-nav-list">
                      <li>
                        <Link to="/inversor" className="button-link">Inversor de Texto</Link>
                      </li>
                      <li>
                        <Link to="/contador" className="button-link">Contador de Pontos</Link>
                      </li>
                      <li>
                        <Link to="/geradorqrcode" className="button-link">Gerador de QR Code</Link>
                      </li>
                      <li>
                        <Link to="/sorteadordenumero" className="button-link">Sorteador de Numeros</Link>
                      </li>
                      <li>
                        <Link to="/geradorsenha" className="button-link">Gerador de Senhas</Link>
                      </li>
                    </ul>
                  </nav>
                </div>
              }
            />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;