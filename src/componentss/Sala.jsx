import { useState } from 'react';
import Boneco from './Boneco';
import React from 'react';
import Monitor from './Monitor';
//import Dialogo from './Dialogo';

export default function Sala({ estaEstudando, onConfigClick }){
  
  const [companheiroPresente, setCompanheiroPresente] = useState(false);
  const [mostrarMonitor, setMostrarMonitor] = useState(false);

  const handlePortaClick = () => {
    new Audio('/assets/sounds/porta.mp3').play();
    setCompanheiroPresente(true);
  };

  return (
    <div className="sala-container">
      <img src="/assets/images/sala.png" alt="Sala de Estudo" className="sala-background" />
      
      <div className='controle-estudos'>

        {!estaEstudando && (
          <div className="play" onClick={onConfigClick}>
            <img src="/assets/play.png" alt="Porta" />
          </div>
        )}

        <div className="play" onClick={handlePortaClick}>
          <img src="/assets/stop.png" alt="Porta" />
        </div>

        <div className="play" onClick={handlePortaClick}>
          <img src="/assets/pause.png" alt="Porta" />
        </div>

        {estaEstudando && (
            <div className="tempo-restante">
                <img src="/assets/clock.png" alt="Porta" /> 
                <div> 
                  <span> 12 min restantes</span> <br></br>
                  <span> próxima pausa em: 12min </span>
                </div>
              
            </div>
        )}

      </div>

      

      <div className="porta" onClick={handlePortaClick}>
        <img src="/assets/images/porta.png" alt="Porta" />
      </div>
      
      <div className="mesa" onClick={() => setMostrarMonitor(true)}>
        <img src="/assets/images/mesa.webp" alt="Mesa" />

          <div className="notebook" onClick={() => setMostrarMonitor(true)}>
            <img src="/assets/images/notebook.png" alt="Mesa" />
          </div>

          <div className="boneco" onClick={() => setMostrarMonitor(true)}>
            <img src="/assets/images/boneco/boneco_sentado_frente.png" alt="Mesa" />
          </div>
      </div>

      <div className="cadeira" onClick={() => setMostrarMonitor(true)}>
        <img src="/assets/images/cadeira.png" alt="Mesa" />
      </div>

      
      
      {companheiroPresente && (
        <>
          <Boneco />
          <Dialogo />
        </>
      )}
      
      {mostrarMonitor && (
        <Monitor onClose={() => setMostrarMonitor(false)} />
      )}
    </div>
  );
}