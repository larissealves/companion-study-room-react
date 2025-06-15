import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';


import PopupApoieDesenvolvedor from './PopupApoieDesenvolvedor';

export default function Sala({ estaEstudando, onConfigClick, endSession }) {
  const [mostrarPopupDoacao, setMostrarPopupDoacao] = useState(false);

  return (
    <div className="sala-container">
      {/*<div className='sala-background'></div>*/}

      <div className='buttons-more-info-container'>
        <PopupApoieDesenvolvedor/>

        <Link
          to="/creditos"
          target="_blank"
          className="btn-primary btn-credits"
        >
          Credits
        </Link>
      </div>

      <div className="sala-container__botoes-navegacao">
        <div className="controle-estudos">
          {!estaEstudando ? (
            <button className='neon-button' onClick={onConfigClick}>START</button>
          ) : (
            <button className='neon-button' onClick={endSession}>Stop</button>

          )}
        </div>
      </div>

      {/* ===================================================
        COMPONENTES
      =======================================================*/}

      {mostrarPopupDoacao && (
        <PopupApoieDesenvolvedor onClose={() => setMostrarPopupDoacao(false)} />
      )}

    </div>
  );
}