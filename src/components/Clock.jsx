import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import '../styles/clock.css'

import PopupSupportDeveloper from './PopupSupportDeveloper';

import tomate2 from '../assets/images/tomate_02.png'
import tomate3 from '../assets/images/tomate_03.png'
import tomate4 from '../assets/images/tomate_04.png'
import iconClock from '../assets/images/clock.png'

export default function Clock({ remainingTime, currentPhase, timeToNextPhase, breakDuration, breakInterval, isStudying, onConfigClick, endSession }) {
  const [hiddenClock, setHiddenClock] = useState(false);
  const [showPopupDonation, setshowPopupDonation] = useState(false);

  const formatTime = (second) => {
    if (typeof second !== 'number' || isNaN(second) || second < 0) return '00:00';
    const h = Math.floor(second / 3600);
    const m = Math.floor((second % 3600) / 60);
    const s = second % 60;
    return h > 0
      ? `${h}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`
      : `${m}:${s.toString().padStart(2, '0')}`;
  };

  return (
<div className="study-panel">
  <div className="buttons-more-info-container">
        <PopupSupportDeveloper />

        <Link
          to="/creditos"
          target="_blank"
          className="btn-primary btn-credits"
        >
          Credits
        </Link>
  </div>

  <div className="study-panel__clock">
        
          {!isStudying ? (
            <>
              <div className="highlighted-phase">Ready to start...</div>
              <div className="highlighted-time">00:00:00</div>
              <div>
                <img src={tomate2} alt="tomate icon" />
                <img src={tomate3} alt="tomate icon" />
                <img src={tomate4} alt="tomate icon" />
                
              </div><button className="neon-button" onClick={onConfigClick}>
                  START
                </button>
            </>
          ) : (
            <>
              <button
                className="btn-close-clock"
                onClick={() => setHiddenClock(!hiddenClock)}
                title={hiddenClock ? 'Show time' : 'Hide time'}
              >
                {hiddenClock ? (
                  <img src={iconClock} alt="Clock icon" />
                ) : (
                  '✖'
                )}
              </button>

              <div className="highlighted-phase">
                {currentPhase === 'studying' ? 'Focus time' : 'Break time'}
              </div>

              <div className={`highlighted-time ${hiddenClock ? 'text-high-blur' : ''}`}>
                {formatTime(remainingTime)}
              </div>

              <div className={hiddenClock ? 'text-high-blur' : ''}>
                {!isNaN(timeToNextPhase) && (
                  currentPhase === 'studying' && breakInterval > 0 ? (
                    <span>{formatTime(timeToNextPhase)} left until halftime</span>
                  ) : (
                    breakInterval > 0  ? (
                      <span>{formatTime(timeToNextPhase)} left to resume studying</span>
                    ) 
                    : null
                  )
                )}
              </div>

              <button className="neon-button" onClick={endSession}>
                STOP
              </button>
            </>
          )}
      </div>

    {/* ===================================================
        COMPONENTES
    ======================================================= */}

    {showPopupDonation && (
      <PopupSupportDeveloper onClose={() => setshowPopupDonation(false)} />
    )}
  </div>
);

}
