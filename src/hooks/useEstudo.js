import { useState, useEffect, useRef } from 'react';
import alertaSom from '../sounds/ringtone-126505.mp3';

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
    tempo_horas: 1,
    tempo_minutos: 0,
    pausas: 25,
    tempopausas: 5
  });

  const [estaEstudando, setEstaEstudando] = useState(false);
  const [faseAtual, setFaseAtual] = useState('estudo');
  const [tempoRestante, setTempoRestante] = useState(0);
  const [etapas, setEtapas] = useState([]);

  const iniciarEstudo = (dados) => {
    const total = (dados.tempo_horas * 60) + Number(dados.tempo_minutos);
    const intervalo = dados.pausas;
    const pausa = dados.tempopausas;

    const etapasTemp = [];

    if (intervalo <= 0 || pausa <= 0 || intervalo >= total) {
      etapasTemp.push({ tipo: 'estudo', duracao: total * 60 });
    } else {
      let restante = total;
      while (restante > intervalo) {
        etapasTemp.push({ tipo: 'estudo', duracao: intervalo * 60 });
        etapasTemp.push({ tipo: 'pausa', duracao: pausa * 60 });
        restante -= intervalo;
      }
      if (restante > 0) {
        etapasTemp.push({ tipo: 'estudo', duracao: restante * 60 });
      }
    }

    console.log('🚀 Etapas geradas:', etapasTemp);

    etapaIndexRef.current = 0;
    tempoRef.current = etapasTemp[0]?.duracao || 0;
    setFaseAtual(etapasTemp[0]?.tipo || 'estudo');
    setTempoRestante(tempoRef.current);

    setConfig(dados);
    setEtapas(etapasTemp);
    setEstaEstudando(true);
  };

  const pararEstudo = () => {
    setEstaEstudando(false);
    setEtapas([]);
    setTempoRestante(0);
    setFaseAtual('estudo');
    etapaIndexRef.current = 0;
    tempoRef.current = 0;
    stopAudio();
  };

  useEffect(() => {
    if (!estaEstudando || etapas.length === 0) return;

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

          if (proximaFase === 'pausa') {
            handleControlModalIntervaloFinalizado();
            if (audioRef.current) {
              audioRef.current.loop = true;
              audioRef.current.play();
              setTimeout(stopAudio, 60000);
            }
          }

        } else {
          clearInterval(interval);
          setEstaEstudando(false);
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
  }, [estaEstudando, etapas]);

  return {
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
  };
}
