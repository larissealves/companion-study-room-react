import { useState, useEffect, useRef } from 'react';
import alertaSom from '../sounds/sound.mp3';

export default function useEstudo() {
  const audioRef = useRef(new Audio(alertaSom));
  const etapaIndexRef = useRef(0);
  const tempoRef = useRef(0);

  const [modalSessaoFinalizada, setMostrarModalSessaoFinalizada] = useState(false);
  const [modalIntervaloFinalizado, setMostrarModalIntervaloFinalizado] = useState(false);

  const handleControlModalIntervaloFinalizado = () => {
    setMostrarModalIntervaloFinalizado(prev => !prev);
    stopAudio();
  };

  const handleControlModalSessaoFinalizada = () => {
    setMostrarModalSessaoFinalizada(prev => !prev);
    stopAudio();
  };

  const stopAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  };

  const [config, setConfig] = useState({
    assunto: '',
    tempo_horas: 0,
    tempo_minutos: 0,
    pausas: 0,
    tempo_pausas: 0
  });

  const [isStudying, setisStudying] = useState(false);
  const [faseAtual, setFaseAtual] = useState('studying');
  const [tempoRestante, setTempoRestante] = useState(0);
  const [etapas, setEtapas] = useState([]);

  const iniciarEstudo = (dados) => {
    const total = (dados.tempo_horas * 60) + Number(dados.tempo_minutos);
    const intervalo = dados.pausas;
    const pausa = dados.tempo_pausas <= 0 ? dados.tempo_pausas : 0;
    const etapasTemp = [];
    console.log(dados.pausas);
    console.log(pausa);
    if (intervalo <= 0 || pausa <= 0 ) {
      //(intervalo <= 0 || pausa <= 0 || intervalo >= total)
      etapasTemp.push({ tipo: 'studying', duracao: total * 60 });
    } else {
      let restante = total;
      while (restante > intervalo) {
        etapasTemp.push({ tipo: 'studying', duracao: intervalo * 60 });
        etapasTemp.push({ tipo: 'rest', duracao: pausa * 60 });
        restante -= intervalo;
      }
      if (restante > 0) {
        etapasTemp.push({ tipo: 'studying', duracao: restante * 60 });
      }
    }

    etapaIndexRef.current = 0;
    tempoRef.current = etapasTemp[0]?.duracao || 0;
    setFaseAtual(etapasTemp[0]?.tipo || 'studying');
    setTempoRestante(tempoRef.current);

    setConfig(dados);
    setEtapas(etapasTemp);
    setisStudying(true);
  };

  const stopStudy = () => {
    setisStudying(false);
    setEtapas([]);
    setTempoRestante(0);
    setFaseAtual('studying');
    etapaIndexRef.current = 0;
    tempoRef.current = 0;
    stopAudio();
  };

  useEffect(() => {
    if (!isStudying || etapas.length === 0) return;

    etapaIndexRef.current = 0;
    tempoRef.current = etapas[etapaIndexRef.current].duracao;

    setFaseAtual(etapas[etapaIndexRef.current].tipo);
    setTempoRestante(tempoRef.current);

    const interval = setInterval(() => {
      tempoRef.current -= 1;
      setTempoRestante(tempoRef.current);

      if (tempoRef.current <= 0) {
        etapaIndexRef.current += 1;

        if (etapaIndexRef.current < etapas.length) {
          tempoRef.current = etapas[etapaIndexRef.current].duracao;

          const proximaFase = etapas[etapaIndexRef.current].tipo;
          setFaseAtual(proximaFase);
          setTempoRestante(tempoRef.current);

          if (proximaFase === 'rest') {
            handleControlModalIntervaloFinalizado();
            if (audioRef.current) {
              audioRef.current.loop = true;
              audioRef.current.play();
              setTimeout(stopAudio, 60000);
            }
          }

        } else {
          clearInterval(interval);
          setisStudying(false);
          setEtapas([]);
          handleControlModalSessaoFinalizada();

          if (audioRef.current) {
            audioRef.current.loop = true;
            audioRef.current.play();
            setTimeout(stopAudio, 60000);
          }
        }
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [isStudying, etapas]);

  return {
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
  };
}
