import { useState, useEffect, useRef } from 'react';
import alertaSom from '../sounds/sound.mp3';

export default function useStudy() {
  const audioRef = useRef(new Audio(alertaSom));
  const stepIndexRef = useRef(0);
  const timeRef = useRef(0);

  const [modalSessionFinalized, setShowModalSessionFinalized] = useState(false);

  const handleControlModalSessionFinalized = () => {
    setShowModalSessionFinalized(prev => !prev);
    stopAudio();
  };

  const stopAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  };

  const [config, setConfig] = useState({
    subject: '',
    time_hours: 0,
    time_minutes: 0,
    breaks: 0,
    time_breaks: 0
  });

  const [isStudying, setIsStudying] = useState(false);
  const [CurrentPhase, setCurrentPhase] = useState('studying');
  const [timeRemaining, settimeRemaining] = useState(0);
  const [steps, setSteps] = useState([]);

  const startStudy = (dados) => {
    const total = (dados.time_hours * 60) + Number(dados.time_minutes);
    const intervalo = dados.breaks; // aqui estava errado
    const breaks = dados.time_breaks > 0 ? dados.time_breaks : 0;
    const stepsTemp = [];

    if (intervalo <= 0 || breaks <= 0) {
      stepsTemp.push({ tipo: 'studying', duracao: total * 60 });
    } else {
      let restante = total;
      while (restante > intervalo) {
        stepsTemp.push({ tipo: 'studying', duracao: intervalo * 60 });
        stepsTemp.push({ tipo: 'rest', duracao: breaks * 60 });
        restante -= intervalo;
      }
      if (restante > 0) {
        stepsTemp.push({ tipo: 'studying', duracao: restante * 60 });
      }
    }

    stepIndexRef.current = 0;
    timeRef.current = stepsTemp[0]?.duracao || 0;
    setCurrentPhase(stepsTemp[0]?.tipo || 'studying');
    settimeRemaining(timeRef.current);

    setConfig(dados);
    setSteps(stepsTemp);
    setIsStudying(true);
  };

  const stopStudy = () => {
    setIsStudying(false);
    setSteps([]);
    settimeRemaining(0);
    setCurrentPhase('studying');
    stepIndexRef.current = 0;
    timeRef.current = 0;
    stopAudio();
  };

  useEffect(() => {
    if (!isStudying || steps.length === 0) return;

    stepIndexRef.current = 0;
    timeRef.current = steps[stepIndexRef.current].duracao;

    setCurrentPhase(steps[stepIndexRef.current].tipo);
    settimeRemaining(timeRef.current);

    const interval = setInterval(() => {
      timeRef.current -= 1;
      settimeRemaining(timeRef.current);

      if (timeRef.current <= 0) {
        stepIndexRef.current += 1;

        if (stepIndexRef.current < steps.length) {
          timeRef.current = steps[stepIndexRef.current].duracao;

          const proximaFase = steps[stepIndexRef.current].tipo;
          setCurrentPhase(proximaFase);
          settimeRemaining(timeRef.current);
          console.log(timeRef.current);

          if (proximaFase === 'rest') {
            if (audioRef.current) {
              audioRef.current.loop = true;
              audioRef.current.play();
              setTimeout(stopAudio, 10000);
            }
          }

        } else {
          clearInterval(interval);
          setIsStudying(false);
          setSteps([]);
          handleControlModalSessionFinalized();

          if (audioRef.current) {
            audioRef.current.loop = true;
            audioRef.current.play();
            setTimeout(stopAudio, 60000);
          }
        }
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [isStudying, steps]);

  return {
    config,
    isStudying,
    startStudy,
    CurrentPhase,
    timeRemaining,
    steps,
    stopStudy,
    modalSessionFinalized,
    handleControlModalSessionFinalized
  };
}
