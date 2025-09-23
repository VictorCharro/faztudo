import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';

// Importe o componente Inversor de Texto
import Inversor from './components/Inversor';
import Contador from './components/Contador';

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