import { useState, useEffect } from 'react'

export default function useEstudo() {
  const [config, setConfig] = useState({
    assunto: '',
    tempo_horas: 1,          // tempo total em minutos
    tempo_minutos: 1,          // tempo total em minutos
    pausas: 25,         // pausa a cada X minutos
    tempopausas: 5      // duração da pausa em minutos
  })

  const [estaEstudando, setEstaEstudando] = useState(false)
  const [faseAtual, setFaseAtual] = useState('estudo') // 'estudo' ou 'pausa'
  const [tempoRestante, setTempoRestante] = useState(0)
  const [etapas, setEtapas] = useState([]) // sequência de blocos

  // Inicia estudo e monta a sequência com base nas pausas
  const iniciarEstudo = (dados) => {
    const total = (dados.tempo_horas) * 60 + Number(dados.tempo_minutos)
    const intervalo = dados.pausas
    const pausa = dados.tempopausas

    setConfig(dados)
    setEstaEstudando(true)

    if (intervalo <= 0 || pausa <= 0 || intervalo >= total) {
      // Sem pausas: um único bloco de estudo
      setEtapas([{ tipo: 'estudo', duracao: total * 60 }])
    } else {
      const etapasTemp = []
      let restante = total

      while (restante > intervalo) {
        etapasTemp.push({ tipo: 'estudo', duracao: intervalo * 60 })
        etapasTemp.push({ tipo: 'pausa', duracao: pausa * 60 })
        restante -= intervalo
      }

      // Último bloco de estudo
      if (restante > 0) {
        etapasTemp.push({ tipo: 'estudo', duracao: restante * 60 })
      }

      setEtapas(etapasTemp)
    }

    setFaseAtual('estudo')
  }

  const pararEstudo = () => {
    setEstaEstudando(false)
    setEtapas([])
    setTempoRestante(0)
    setFaseAtual('estudo')
  }

  // Roda cada etapa sequencialmente
  useEffect(() => {
    if (!estaEstudando || etapas.length === 0) return

    let etapaIndex = 0
    let tempo = etapas[etapaIndex].duracao
    setFaseAtual(etapas[etapaIndex].tipo)
    setTempoRestante(tempo)

    const interval = setInterval(() => {
      tempo -= 1
      setTempoRestante(tempo)

      if (tempo <= 0) {
        etapaIndex += 1

        if (etapaIndex < etapas.length) {
          tempo = etapas[etapaIndex].duracao
          setFaseAtual(etapas[etapaIndex].tipo)
          setTempoRestante(tempo)
        } else {
          clearInterval(interval)
          setEstaEstudando(false)
          setEtapas([])
          alert('Sessão de estudo concluída!')
        }
      }
    }, 1000)

    return () => clearInterval(interval)
  }, [estaEstudando, etapas])

  return {
    config,
    estaEstudando,
    iniciarEstudo,
    faseAtual,
    tempoRestante,
    etapas,
    pararEstudo
  }
}