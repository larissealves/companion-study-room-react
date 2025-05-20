import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import PopupApoieDesenvolvedor from './PopupApoieDesenvolvedor';

import useIsMobile from '../hooks/backgroundImage'; 


export default function Sala({ estaEstudando, onConfigClick }) {
  const [mostrarPopupDoacao, setMostrarPopupDoacao] = useState(false);
  // Controle de Tela Cheia
  const [isFullscreen, setIsFullscreen] = useState(false);

  const ativarTelaCheia = () => {
    const elem = document.documentElement;
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem.webkitRequestFullscreen) {
      elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) {
      elem.msRequestFullscreen();
    }
  };

  const sairDaTelaCheia = () => {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen();
    }
  };

  useEffect(() => {
    const handle = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handle);
    return () => {
      document.removeEventListener('fullscreenchange', handle);
    };
  }, []);

  const isMobile = useIsMobile();
  console.log('Is mobile:', isMobile);

  return (
    <div className="sala-container">
      <div className='sala-background'></div>
        
      <div className='container-botoes-mais-informacoes'>
        <Link 
        className="btn-creditos doacao"
        onClick={() => setMostrarPopupDoacao(true)}
        title="Support the developer"
      >
        ☕ Support
      </Link>

        <Link 
          to="/creditos" 
          target="_blank" 
          className="btn-creditos"
        >
          💡 Credits
        </Link>
      </div> 
      

        <div className="controle-estudos change-full-screen">
          <button 
            className="buttons bnt-tela-cheia" 
            onClick={isFullscreen ? sairDaTelaCheia : ativarTelaCheia}
          >
            {isFullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen'}
          </button>
        </div>

        <div className="sala-container__botoes-navegacao">
          <div className="controle-estudos">
            {!estaEstudando && (
              <div 
                className="play" 
                title="Start Pomodoro" 
                onClick={onConfigClick}
              >
                <img 
                  src="/assets/play.png" 
                  alt="play" 
                />
              </div>
            )}
          </div>
        </div>
        {mostrarPopupDoacao && (
          <PopupApoieDesenvolvedor onClose={() => setMostrarPopupDoacao(false)} />
        )}
    </div>
  );
}