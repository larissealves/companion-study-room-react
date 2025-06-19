import React, { useEffect, useState } from 'react';

// 🗂️ COMPONENTES
import Clock from './components/Clock';
import PopupSessionCompleted from './components/PopupSessionCompleted.jsx';

// 🧩 HOOKS
import useStudy from './hooks/useStudy.js';

// 📦 ASSETS
import tomate1 from '../src/assets/images/tomate_01.png';

// 🎨 STYLES
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
    startStudy,
    CurrentPhase,
    timeRemaining,
    steps,
    stopStudy,
    modalSessionFinalized,
    handleControlModalSessionFinalized
  } = useStudy();

  const totalRemaining = steps?.length > 0
    ? steps.slice(1).reduce((sum, etapa) => sum + etapa.duracao, 0) + timeRemaining
    : 0;

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

    if (Number(hours) <= 0 && Number(minutes) <= 0) {
      newErrors.time = 'Study time must be greater than 0.';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    startStudy({
      subject: subject,
      time_hours: Number(hours),
      time_minutes: Number(minutes),
      breaks: (Number(hours) > 0 || Number(minutes) >= 20) ? breakInterval : 0,
      time_breaks: (breakInterval > 0 ? breakDuration : 0),
    });

    setShowConfig(false);
    setErrors({});
  };

  return (
    <div className="app">

      {/* === Header === */}
      <div className='main-prhase'>
        <img
          src={tomate1}
          alt="tomate icon"
        />
        <p>Pomodoro Timer</p>
      </div>

      {/* === Configure Session Modal === */}
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
              <div className='container-btn-start-session'>
                <button
                  className="btn-primary"
                  onClick={handleStart}
                >
                  Start Session
                </button>
              </div>
              <button
                className="btn-secundario"
                onClick={() => setShowConfig(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* === Clock === */}
      <Clock
        remainingTime={totalRemaining}
        currentPhase={CurrentPhase}
        timeToNextPhase={timeRemaining}
        breakDuration={breakDuration}
        breakInterval={breakInterval}
        isStudying={isStudying}
        onConfigClick={() => setShowConfig(true)}
        endSession={stopStudy}
      />

      {/* === Session Completed Modal === */}
      {modalSessionFinalized && (
        <PopupSessionCompleted 
          onClose={handleControlModalSessionFinalized} 
        />
      )}

    </div>
  );
}
