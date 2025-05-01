// src/components/Monitor.jsx
import React, { useEffect, useState } from "react";
import '../styles/global.css';

export default function Monitor({ onClose }) {
    const [conteudo, setConteudo] = useState('estudo');
    
    const telas = {
      estudo: '/assets/images/telas/estudos.jpeg',
      youtube: '/assets/images/telas/youtube.jpeg',
      gatinhos: '/assets/images/telas/gatinho.jpg'
    };
  
    return (
      <div className="monitor-overlay">
        <div className="monitor-content">
        <div className="monitor-header">
          <div>
            <button class="btn-aba-navegacao" onClick={() => setConteudo('estudo')}>Modo Estudo</button>
            <button  class="btn-aba-navegacao" onClick={() => setConteudo('youtube')}>YouTube</button>
            <button class=" btn-aba-navegacao btn-aba-navegacao-active" onClick={() => setConteudo('gatinhos')}>Gatinhos</button>
            <span class="btn-aba-navegacao__plus"> + </span>
          </div>

          <div class="buttons">
            <span class="btn-icon minimizar " title="Minimizar">—</span>
            <span class="btn-icon maximizar " title="Maximizar">☐</span>
            <button class="btn-icon fechar" title="Fechar" onClick={onClose}>⨉</button>
  
          </div> 
        </div>  

        <div class ="address-bar-container">
          <div class ="address-bar"></div> 
        </div> 

        <div class='monitor-body'> 
            <img 
              src={telas[conteudo]} 
              alt="Monitor" 
              className="monitor-screen"
            />
        </div>

        </div>
      </div>
    );
  }