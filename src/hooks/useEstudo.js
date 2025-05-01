import { useState, useEffect } from 'react';

export default function useEstudo() {
  const [config, setConfig] = useState({
    assunto: '',
    tempo: 30,
    pausas: 25
  });
  const [estaEstudando, setEstaEstudando] = useState(false);

  const iniciarEstudo = (dados) => {
    setConfig(dados);
    setEstaEstudando(true);
  };

  useEffect(() => {
    if (!estaEstudando) return;

    const timer = setTimeout(() => {
      setEstaEstudando(false);
      alert('Tempo de estudo concluído!');
    }, config.tempo * 60 * 1000);

    return () => clearTimeout(timer);
  }, [estaEstudando, config.tempo]);

  return { config, estaEstudando, iniciarEstudo };
}