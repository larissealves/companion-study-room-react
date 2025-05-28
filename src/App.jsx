import React, { useEffect, useState } from 'react';

import Sala from './componentss/Sala';
import RelogioFundo from './componentss/Clock';
import PopupSessaoEstudoFinalizado from './componentss/Modal-sessao-concluido';
import PopupIntervaloFinalizado from './componentss/Modal-intervalo-concluido';

import useEstudo from './hooks/useEstudo';

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
    estaEstudando,
    iniciarEstudo,
    faseAtual,
    tempoRestante,
    etapas,
    pararEstudo,
    modalSessaoFinalizada,
    handleControlModalSessaoFinalizada,
    modalIntervaloFinalizado,
    handleControlModalIntervaloFinalizado
  } = useEstudo();

  const totalRemaining = etapas?.length > 0
    ? etapas.slice(1).reduce((sum, etapa) => sum + etapa.duracao, 0) + tempoRestante
    : 0;

  const formatTime = (seconds) => {
    if (typeof seconds !== 'number' || isNaN(seconds) || seconds < 0) return '00:00';
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return h > 0
      ? `${h}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`
      : `${m}:${s.toString().padStart(2, '0')}`;
  };

  useEffect(() => {
    if (showConfig) {
      setSubject('');
      setHours('');
      setMinutes('');
      setBreakInterval(0);
      setBreakDuration(5);
      setErrors({});
    }
  }, [showConfig]);

  const handleStart = () => {
    const newErrors = {};

    if (subject.trim() === '') {
      newErrors.subject = 'Subject cannot be empty.';
    }

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
      pausas: breakInterval,
      tempopausas: breakInterval > 0 ? breakDuration : 0
    });

    setShowConfig(false);
    setErrors({});
  };

  useEffect(() => {
  const handleMouseMove = (e) => {
    const { innerWidth, innerHeight } = window;
    const x = ((e.clientX / innerWidth) * 10).toFixed(10);
    const y = ((e.clientY / innerHeight) * 10).toFixed(10);
    document.body.style.backgroundPosition = `${x}% ${y}%`;
  };

  window.addEventListener('mousemove', handleMouseMove);

  return () => {
    window.removeEventListener('mousemove', handleMouseMove);
  };
}, []);


  return (
    <div className="app">

      <div className='main-prhase'>
        <p> LESS EXPECTATIONS </p>
        <p>MORE SATISFACTION </p>
      </div>

      {showConfig && (
        <div className="modal-overlay">
          <div className="modal new-session">
            <h2>Study Session Setup</h2>

            <div className="form-group">
              <label>Subject:</label>
              <textarea
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="e.g. Math, React, History..."
              />
              {errors.subject && <p className="erro-texto">{errors.subject}</p>}
            </div>

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
                  <option value="10">10 minutes</option>
                  <option value="15">15 minutes</option>
                  <option value="20">20 minutes</option>
                  <option value="25">25 minutes</option>
                  <option value="30">30 minutes</option>
                  <option value="0">No breaks</option>
                </select>
              </div>
            )}

            {breakInterval > 0 && (
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

      <div className="study-panel">
        {estaEstudando ? (
          <>
            <div className="study-panel__clock">
              <RelogioFundo
                tempoRestante={totalRemaining}
                faseAtual={faseAtual}
                estaEstudando={estaEstudando}
                timeToNextPhase={tempoRestante}
                breakDuration={breakDuration}
                breakInterval={breakInterval}
              />
            </div>
            {/* 
            <div>
              <span><strong>{config.assunto}</strong></span>
            </div>
            */}
          </>
        ) : (
          <>
            <div className="study-panel__clock">

              <div className="highlighted-phase">Pomodoro Timer </div>
              <div className="highlighted-phase">Ready to start...</div>

              <div className="highlighted-time">
                00:00:00
              </div>

            </div>
          </>
        )}
      </div>


      {/* ===================================================
    COMPONENTES
=======================================================*/}
      <Sala estaEstudando={estaEstudando}
        onConfigClick={() => setShowConfig(true)}
        endSession={pararEstudo}
      />


      {modalSessaoFinalizada && (
        <PopupSessaoEstudoFinalizado onCloser={handleControlModalSessaoFinalizada} />
      )}

      {modalIntervaloFinalizado && (
        <PopupIntervaloFinalizado onCloser={handleControlModalIntervaloFinalizado} />
      )}

    </div>
  );
}
