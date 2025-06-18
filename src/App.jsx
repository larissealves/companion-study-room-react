import React, { useEffect, useState } from 'react';

import Clock from './components/Clock';
import PopupSessaoEstudoFinalizado from './components/Modal-sessao-concluido';
import PopupIntervaloFinalizado from './components/Modal-intervalo-concluido';

import useEstudo from './hooks/useEstudo';

import tomate1 from '../src/assets/images/tomate_01.png'
import './styles/global.css';
import './styles/modal-conf.css';


export default function App() {
  const [showConfig, setShowConfig] = useState(false);
  const [subject, setSubject] = useState('');
  const [hours, setHours] = useState('');
  const [minutes, setMinutes] = useState('');
  const [breakInterval, setBreakInterval] = useState(0);
  const [breakDuration, setBreakDuration] = useState(5);
  const [errors, setErrors] = useState({});

  const {
    config,
    isStudying,
    iniciarEstudo,
    faseAtual,
    tempoRestante,
    etapas,
    stopStudy,
    modalSessaoFinalizada,
    handleControlModalSessaoFinalizada,
    modalIntervaloFinalizado,
    handleControlModalIntervaloFinalizado
  } = useEstudo();

  const totalRemaining = etapas?.length > 0
    ? etapas.slice(1).reduce((sum, etapa) => sum + etapa.duracao, 0) + tempoRestante
    : 0;

  /*useEffect(() => {
    
    if (showConfig) {
      setSubject('');
      setHours('');
      setMinutes('');
      setBreakInterval(0);
      setBreakDuration(5);
      setErrors({});
    }
  }, [showConfig]);*/

  const handleStart = () => {
    const newErrors = {};

    if (Number(hours) <= 0 && Number(minutes) <= 0) {
      newErrors.time = 'Study time must be greater than 0.';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    iniciarEstudo({
      assunto: subject,
      tempo_horas: Number(hours),
      tempo_minutos: Number(minutes),
      pausas: (Number(hours) > 0 || Number(minutes) >= 20) ? breakInterval : 0,
      tempopausas: (breakInterval > 0 ? breakDuration : 0),
    });

    setShowConfig(false);
    setErrors({});
  };


  return (
    <div className="app">

      <div className='main-prhase'>
        <img
          src={tomate1}
          className=""
          alt="tomate icon"
        />
        <p> Pomodoro Timer  </p>
      </div>



      {showConfig && (
        <div className="modal-overlay">
          <div className="modal new-session">
            <h2>Study Session Setup</h2>
            <div className="form-group tempo-estudo">
              <label>Study time</label>
              <div>
                <div>
                  <input
                    type="number"
                    min="0"
                    value={hours}
                    onChange={(e) => setHours(e.target.value)}
                    placeholder="hh"
                  />
                  <label>h</label>
                </div>
                <div>
                  <input
                    type="number"
                    min="0"
                    value={minutes}
                    onChange={(e) => setMinutes(e.target.value)}
                    placeholder="mm"
                  />
                  <label>min</label>
                </div>
              </div>
              {errors.time && <p className="erro-texto">{errors.time}</p>}
            </div>

            {(Number(hours) > 0 || Number(minutes) >= 20) && (
              <div className="form-group">
                <label>Break every:</label>
                <select
                  value={breakInterval}
                  onChange={(e) => setBreakInterval(Number(e.target.value))}
                >
                  <option value="0">No breaks</option>
                  <option value="10">10 minutes</option>
                  <option value="15">15 minutes</option>
                  <option value="20">20 minutes</option>
                  <option value="25">25 minutes</option>
                  <option value="30">30 minutes</option>
                </select>
              </div>
            )}

            {(breakInterval > 0) && (
              <div className="form-group">
                <label>Break duration:</label>
                <select
                  value={breakDuration}
                  onChange={(e) => setBreakDuration(Number(e.target.value))}
                >

                  <option value="5">5 minutes</option>
                  <option value="10">10 minutes</option>
                  <option value="15">15 minutes</option>
                  <option value="20">20 minutes</option>
                  <option value="25">25 minutes</option>
                  <option value="30">30 minutes</option>
                </select>
              </div>
            )}

            <div className="botoes-modal">
              <button className="btn-primary" onClick={handleStart}>
                Start Session
              </button>
              <button className="btn-secundario" onClick={() => setShowConfig(false)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      <Clock
        remainingTime={totalRemaining}
        currentPhase={faseAtual}
        timeToNextPhase={tempoRestante}
        breakDuration={breakDuration}
        breakInterval={breakInterval}
        isStudying={isStudying}
        onConfigClick={() => setShowConfig(true)}
        endSession={stopStudy}
      />
      {/* ===================================================
          COMPONENTES
      =======================================================*/}

      {modalSessaoFinalizada && (
        <PopupSessaoEstudoFinalizado onCloser={handleControlModalSessaoFinalizada} />
      )}

      {modalIntervaloFinalizado && (
        <PopupIntervaloFinalizado onCloser={handleControlModalIntervaloFinalizado} />
      )}

    </div>
  );
}
