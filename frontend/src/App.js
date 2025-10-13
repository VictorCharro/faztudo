import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';

import Inversor from './components/Inversor';
import Contador from './components/Contador';
import GeradorQrCode from './components/GeradorQrCode';
import SorteadorDeNumero from './components/SorteadorDeNumero';
import GeradorSenha from './components/GeradorSenha';
import CalculadoraIMC from './components/CalculadoraIMC';
import ConversorDeMedidas from './components/ConversorDeMedidas';

function App() {
  const tools = [
    {
      path: "/inversor",
      name: "Inversor de Texto",
      description: "Inverta qualquer texto de forma rápida e simples",
      icon: <img src="https://img.icons8.com/?size=100&id=60699&format=png&color=667eea" alt="Inversor Icon"
        width="50"
        height="50" />
    },
    {
      path: "/contador",
      name: "Contador de Pontos",
      description: "Conte e gerencie pontuações facilmente",
      icon: <img src="https://img.icons8.com/?size=100&id=60kO5lSIcW3O&format=png&color=667eea" alt="Contador Icon"
        width="50"
        height="50" />
    },
    {
      path: "/geradorqrcode",
      name: "Gerador de QR Code",
      description: "Crie QR Codes personalizados em segundos",
      icon: <img src="https://img.icons8.com/?size=100&id=UBvObYl8hwHF&format=png&color=667eea" alt="QR Code Icon"
        width="50"
        height="50" />
    },
    {
      path: "/sorteadordenumero",
      name: "Sorteador de Números",
      description: "Sorteie números aleatórios com configurações flexíveis",
      icon: <img src="https://img.icons8.com/?size=100&id=8Bv7Az7nb1dV&format=png&color=667eea" alt="Sorteador Icon"
        width="50"
        height="50" />
    },
    {
      path: "/geradorsenha",
      name: "Gerador de Senhas",
      description: "Crie senhas seguras e personalizadas",
      icon: <img src="https://img.icons8.com/?size=100&id=Olb7kLksOqH2&format=png&color=667eea" alt="Senha Icon"
        width="50"
        height="50" />
    },
    {
      path: "/calculadoraimc",
      name: "Calculadora de IMC",
      description: "Calcule seu Índice de Massa Corporal",
      icon: <img src="https://img.icons8.com/?size=100&id=4CyHl4ks2qX0&format=png&color=667eea" alt="IMC Icon"
        width="50"
        height="50" />
    },
    {
      path: "/conversordemedidas",
      name: "Conversor de Medidas",
      description: "Converta unidades de medida facilmente",
      icon: <img src="https://img.icons8.com/?size=100&id=Umn21YWLNm0k&format=png&color=667eea" alt="Conversor Icon"
        width="50"
        height="50" />
    }
  ];

  return (
    <Router>
      <div className="App">
        <header className="App-header-custom">
          <Link to="/" className="logo-link">
            <div className="logo-container">
              <h1>FazTudo</h1>
            </div>
          </Link>
        </header>

        <main className="App-main-content">
          <Routes>
            <Route path="/inversor" element={<Inversor />} />
            <Route path="/contador" element={<Contador />} />
            <Route path="/geradorqrcode" element={<GeradorQrCode />} />
            <Route path="/sorteadordenumero" element={<SorteadorDeNumero />} />
            <Route path="/geradorsenha" element={<GeradorSenha />} />
            <Route path="/calculadoraimc" element={<CalculadoraIMC />} />
            <Route path="/conversordemedidas" element={<ConversorDeMedidas />} />
            <Route
              path="/"
              element={
                <div className="home-container">
                  {/* Hero Section */}
                  <section className="hero-section">
                    <h3 className="hero-subtitle">
                      Acesse gratuitamente nossas ferramentas práticas e eficientes para facilitar seu dia a dia.
                    </h3>
                  </section>

                  {/* Tools Grid */}
                  <section className="tools-section">
                    <div className="tools-grid">
                      {tools.map((tool, index) => (
                        <Link
                          key={index}
                          to={tool.path}
                          className="tool-card"
                        >
                          <div className="tool-icon">{tool.icon}</div>
                          <h3 className="tool-name">{tool.name}</h3>
                          <p className="tool-description">{tool.description}</p>
                          <span className="tool-cta">Usar Ferramenta →</span>
                        </Link>
                      ))}
                    </div>
                  </section>
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