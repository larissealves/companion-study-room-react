import React, { useState } from 'react';
import '../styles/clock.css';

export default function RelogioFundo({ tempoRestante, faseAtual }) {
  const [hiddenClock, setHiddenClock] = useState(false);

  const formatarTempo = (segundos) => {
    if (typeof segundos !== 'number' || isNaN(segundos) || segundos < 0) return '00:00';

    const h = Math.floor(segundos / 3600);
    const m = Math.floor((segundos % 3600) / 60);
    const s = segundos % 60;

    return h > 0
      ? `${h}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`
      : `${m}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="relogio-fundo">
      <button
        className="btn-fechar-relogio"
        onClick={() => setHiddenClock(!hiddenClock)}
        title={hiddenClock ? 'Show time' : 'Hide time'}
      >
        {hiddenClock ? '⏰' : '✖'}
      </button>

      <div className="fase-destacada">
        {faseAtual === 'estudo' ? 'Focus time' : 'Break time'}
      </div>

      {!hiddenClock && (
        <div className="tempo-destacado">
          {formatarTempo(tempoRestante)}
        </div>
      )}
    </div>
  );
}
