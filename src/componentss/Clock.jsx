import React, { useState } from 'react';
import '../styles/clock.css'

export default function RelogioFundo({ tempoRestante, faseAtual, timeToNextPhase, breakDuration, breakInterval }) {
  const [hiddenClock, setHiddenClock] = useState(false);

  const formatTime = (segundos) => {
    if (typeof segundos !== 'number' || isNaN(segundos) || segundos < 0) return '00:00';
    const h = Math.floor(segundos / 3600);
    const m = Math.floor((segundos % 3600) / 60);
    const s = segundos % 60;
    return h > 0
      ? `${h}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`
      : `${m}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div >
      <button
        className="btn-close-clock"
        onClick={() => setHiddenClock(!hiddenClock)}
        title={hiddenClock ? 'Show time' : 'Hide time'}
      >
        {hiddenClock ? '⏰' : '✖'}
      </button>

      <div className="highlighted-phase">
        {faseAtual === 'estudo' ? 'Focus time' : 'Break time'}
      </div>

      <div className={`highlighted-time ${hiddenClock ? 'highlighted-time text-high-blur' : ''}`}>
        {formatTime(tempoRestante)}
      </div>
      <div className={hiddenClock ? 'text-high-blur' : ''}>
        {!isNaN(timeToNextPhase) && (
          faseAtual === 'estudo' && breakDuration > 0 ? (
            <span>{formatTime(timeToNextPhase)} left until halftime </span>
          ) : (
            breakDuration > 0 && breakInterval ? (
              <span> {formatTime(timeToNextPhase)}  left to resume studying</span>
            ) : null
          ))}
      </div>

    </div>
  );
}
