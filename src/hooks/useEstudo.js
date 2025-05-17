import { useState, useEffect, useRef } from 'react';
import alertaSom from '../../public/assets/sounds/ringtone-126505.mp3';
import PopupSessaoEstudoFinalizada from '../componentss/Modal-sessao-concluida';

export default function useEstudo() {
  const audioRef = useRef(new Audio(alertaSom));

  // Handle study finished popup
  const [modalSessaoFinalizada, setMostarModalSesaoFinalizada] = useState(false);
  const handleControlModalSessaoFinalizada = () => {
    setMostarModalSesaoFinalizada(prev => !prev);
    audioRef.current.pause();
    audioRef.current.currentTime = 0;
  };

  // Initial configuration
  const [config, setConfig] = useState({
    assunto: '',
    tempo_horas: 1,      // total study hours
    tempo_minutos: 1,    // total study minutes
    pausas: 25,          // break every X minutes
    tempopausas: 5       // break duration in minutes
  });

  const [estaEstudando, setEstaEstudando] = useState(false);
  const [faseAtual, setFaseAtual] = useState('estudo'); // 'estudo' or 'pausa'
  const [tempoRestante, setTempoRestante] = useState(0);
  const [etapas, setEtapas] = useState([]); // sequence of blocks

  // Start study session and build block sequence
  const iniciarEstudo = (dados) => {
    const total = (dados.tempo_horas * 60) + Number(dados.tempo_minutos);
    const intervalo = dados.pausas;
    const pausa = dados.tempopausas;

    setConfig(dados);
    setEstaEstudando(true);

    if (intervalo <= 0 || pausa <= 0 || intervalo >= total) {
      // No breaks: single block
      setEtapas([{ tipo: 'estudo', duracao: total * 60 }]);
    } else {
      const etapasTemp = [];
      let restante = total;

      while (restante > intervalo) {
        etapasTemp.push({ tipo: 'estudo', duracao: intervalo * 60 });
        etapasTemp.push({ tipo: 'pausa', duracao: pausa * 60 });
        restante -= intervalo;
      }

      // Final study block
      if (restante > 0) {
        etapasTemp.push({ tipo: 'estudo', duracao: restante * 60 });
      }

      setEtapas(etapasTemp);
    }

    setFaseAtual('estudo');
  };

  const pararEstudo = () => {
    setEstaEstudando(false);
    setEtapas([]);
    setTempoRestante(0);
    setFaseAtual('estudo');
  };

  // Run each block sequentially
  useEffect(() => {
    if (!estaEstudando || etapas.length === 0) return;

    let etapaIndex = 0;
    let tempo = etapas[etapaIndex].duracao;

    setFaseAtual(etapas[etapaIndex].tipo);
    setTempoRestante(tempo);

    const interval = setInterval(() => {
      tempo -= 1;
      setTempoRestante(tempo);

      if (tempo <= 0) {
        etapaIndex += 1;

        if (etapaIndex < etapas.length) {
          tempo = etapas[etapaIndex].duracao;
          setFaseAtual(etapas[etapaIndex].tipo);
          setTempoRestante(tempo);
        } else {
          clearInterval(interval);
          setEstaEstudando(false);
          setEtapas([]);
          handleControlModalSessaoFinalizada();

          if (audioRef.current) {
            audioRef.current.loop = true;
            audioRef.current.play();

            // Stop sound automatically after 1 minute
            setTimeout(() => {
              if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current.currentTime = 0;
              }
            }, 60000);
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
    handleControlModalSessaoFinalizada
  };
}
