// Import de bibliotecas (sempre primeiro)
import { useState } from 'react';
import React from 'react';

// Import de componentes (ordem alfabética)
import Sala from './componentss/Sala'

// Import de hooks personalizados
import useEstudo from './hooks/useEstudo';

// Import de estilos (por ordem de especificidade)
import './styles/global.css';
import './modal-conf.css';
import './styles/animacoes.css';


export default function App() {
  const {
    config,
    estaEstudando,
    iniciarEstudo
  } = useEstudo()
  
  const [mostrarConfig, setMostrarConfig] = useState(false)

  const handleIniciarEstudo = (dados) => {
    iniciarEstudo(dados)
    setMostrarConfig(false)
  }

  return (
    <div className="app">
      <h1 className="titulo-app">Sala de Estudo Virtual</h1>
      
      <Sala 
        estaEstudando={estaEstudando} 
        onConfigClick={() => setMostrarConfig(true)}
      />
      
      {/* Modal de Configuração */}
      {mostrarConfig && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Configurar Sessão</h2>
            
            <div className="form-group">
              <label>Assunto:</label>
              <input 
                type="text" 
                defaultValue={config.assunto}
                placeholder="Ex: Matemática, React, História..."
              />
            </div>
            
            <div className="form-group">
              <label>Tempo (minutos):</label>
              <input 
                type="number" 
                min="5" 
                max="120" 
                defaultValue={config.tempo}
              />
            </div>
            
            <div className="form-group">
              <label>Pausas a cada:</label>
              <select defaultValue={config.pausas}>
                <option value="25">25 minutos</option>
                <option value="50">50 minutos</option>
                <option value="0">Sem pausas</option>
              </select>
            </div>
            
            <div className="botoes-modal">
              <button 
                className="btn-primario"
                onClick={() => handleIniciarEstudo({
                  assunto: document.querySelector('input[type="text"]').value,
                  tempo: parseInt(document.querySelector('input[type="number"]').value),
                  pausas: parseInt(document.querySelector('select').value)
                })}
              >
                Iniciar Estudo
              </button>
              
              <button 
                className="btn-secundario"
                onClick={() => setMostrarConfig(false)}
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Notificação quando estiver estudando */}
      {estaEstudando && (
        <div className="tempo-restante notificacao-estudo">
          <span>📚📒 Estudando:  {" " + config.assunto}</span> 
          <br></br>
          <span>⏰ Duração: {config.tempo} minutos</span> 
          <br></br>
          <span> ✨💫 Intervalo a cada: {config.pausas} minutos</span>
        </div>
      )}
    </div>
  )
}