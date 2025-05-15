// Import de bibliotecas (sempre primeiro)
import { useEffect, useState } from 'react';
import React from 'react';

// Import de componentes (ordem alfabética)
import Sala from './componentss/Sala'

// Import de hooks personalizados
import useEstudo from './hooks/useEstudo';

// Import de estilos (por ordem de especificidade)
import './styles/global.css';
import './modal-conf.css';
import './styles/animacoes.css';


export default function App() {
  const {
    config,
    estaEstudando,
    iniciarEstudo,
    faseAtual,
    tempoRestante,
    etapas, // se você precisar
    pararEstudo
  } = useEstudo()

  const [mostrarConfig, setMostrarConfig] = useState(false)
  const [erros, setErros] = useState({ 
    error_assunto: '',
    error_tempoHoras: '', 
    error_tempoMinutos: '',
    error_tempopausas: '' 
  })
  
  const tempoAteTroca = tempoRestante
  // Tempo total restante até o fim da sessão
  const tempoTotalRestante = etapas?.length > 0
  ? etapas.slice(1) // exclui a etapa atual (a que está rodando)
    .reduce((total, etapa) => total + etapa.duracao, 0) + tempoRestante
  :0

  const formatarTempo = (segundos) => {
    if(typeof segundos !== 'number' || isNaN(segundos) | segundos < 0) return '00:00'
    const m = Math.floor(segundos / 60)
    const s = segundos % 60
    return `${m}:${s.toString().padStart(2, '0')}`
  }

  // Estados locais para os campos do formulário
  const [assunto, setAssunto] = useState('')
  const [tempo_horas, setTempoHoras] = useState(0)
  const [tempo_minutos, setTempoMinutos] = useState(0)
  const [pausas, setPausas] =  useState(0)
  const [tempopausas, setTempoPausas] =  useState(5)

  // Limpar campos do formulário
  useEffect(() =>
    {
      if(mostrarConfig) {
        setAssunto('')
        setTempoHoras(0)
        setTempoMinutos(0)
        setPausas(0) 
        setTempoPausas(5) 
        setErros({})
      }
    }, [mostrarConfig]
  )
 
  const handleIniciarEstudo = () => {
    const novosErros = {}
    if (assunto.trim() === '') {
      novosErros.error_assunto = 'O campo "Assunto" não pode estar em branco.'
    }

    if (tempo_horas <= 0 && tempo_minutos <= 0) {
      novosErros.error_tempo =  'O tempo de estudo deve ser maior que 0.'
    }

    if (Object.keys(novosErros).length > 0) {
      setErros(novosErros)
      return
    }

    iniciarEstudo({
      assunto, 
      tempo_horas, 
      tempo_minutos, 
      pausas, 
      tempopausas: pausas > 0 ? tempopausas : 0
    })
    setErros({})
    setMostrarConfig(false)
  }

  return (
    <div className="app">
      <h1 className="titulo-app">Sala de Estudo Virtual</h1>
      
      <Sala 
        estaEstudando={estaEstudando} 
        onConfigClick={() => setMostrarConfig(true)}
      />
      
      {/* Modal de Configuração */}
      {mostrarConfig && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Configurar Sessão</h2>
            
            <div className="form-group">
              <label>Assunto:</label>
              <input 
                name="assunto"
                type="text" 
                value={assunto}
                onChange={(e) => setAssunto(e.target.value)}
                placeholder="Ex: Matemática, React, História..."
              />
              {erros.error_assunto && <p className="erro-texto">{erros.error_assunto}</p>}
            </div>
            
            <div className="form-group tempo-estudo">
               <label> Tempo </label> 
               <div>
               
              <input 
                name="tempo_horas"
                type="number" 
                min="5" 
                max="120" 
                value={tempo_horas}                            
                onChange={(e) => setTempoHoras(Number(e.target.value))}
                //defaultValue={config.tempo}
                //Não use defaultValue aqui! – Isso é o mais importante. 
                // Usar defaultValue cria um campo não controlado, o que ignora setState.
              />
              <label>h </label>
              
              <input 
                name="tempo_minutos"
                type="number" 
                min="5" 
                max="120" 
                value={tempo_minutos}                            
                onChange={(e) => setTempoMinutos(Number(e.target.value))}
                //defaultValue={config.tempo}
                //Não use defaultValue aqui! – Isso é o mais importante. 
                // Usar defaultValue cria um campo não controlado, o que ignora setState.
              />
              <label>min</label>
              {erros.error_tempoHoras || erros.error_tempoMinutos && <p className="erro-texto">{erros.error_tempo}</p>}
              </div>
            </div>
            
            <div className="form-group">
              <label>Pausas a cada:</label>
              <select 
                name="pausas"
                value={pausas}
                onChange={(e) => setPausas(Number(e.target.value))}
              >
                <option value="10">10 minutos</option>
                <option value="15">15 minutos</option>
                <option value="20">20 minutos</option>
                <option value="25">25 minutos</option>
                <option value="30">30 minutos</option>
                <option value="0">Sem pausas</option>
              </select>
            </div>

            {! pausas <= 0 && (
            <div className="form-group">
              <label>Tempo da pausa:</label>
              <select 
                name="tempopausas"
                value={tempopausas}
                onChange={(e) => setTempoPausas(Number(e.target.value))}
              >
                <option value="5">5 minutos</option>
                <option value="10">10 minutos</option>
                <option value="15">15 minutos</option>
                <option value="20">20 minutos</option>
                <option value="25">25 minutos</option>
                <option value="30">30 minutos</option>
              </select>
             
            </div>
            )}

            <div className="botoes-modal">
              <button 
                className="btn-primario"
                onClick={() => handleIniciarEstudo({
                  assunto,
                  tempo_horas,
                  tempo_minutos,
                  pausas,
                  tempopausas: pausas > 0 ? tempopausas: 0
                  
                })}
              >
                Iniciar Estudo
              </button>
              
              <button 
                className="btn-secundario"
                onClick={() => setMostrarConfig(false)}
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Notificação quando estiver estudando */}
      {estaEstudando && (
        <div className="painel-estudo">
          
          <span>📚<strong>{config.assunto}</strong></span> 
          <br></br>
          <span>🧭 Fase atual: <strong>{faseAtual === 'estudo' ? 'Estudando' : 'Pausa'}</strong></span>
          <br></br>

          {!isNaN(tempoTotalRestante) && (
            <span>🏁 Tempo total restante da sessão: {formatarTempo(tempoTotalRestante)}</span>          )}
          <br></br>

          {!isNaN(tempoRestante) && (
            faseAtual === 'estudo' && config.pausas > 0 ? (
              <span>⏳ Tempo até o próximo intervalo: {formatarTempo(tempoRestante)}</span>
            ) : (
              config.pausas > 0 && config.tempopausas ? (
                <span>☕ O intervalo finaliza em: {formatarTempo(tempoRestante)}</span>
              ) : null
            )
          )}
        <button className="btn-encerrar-estudo" onClick={pararEstudo}> 🛑 Encerrar Estudo</button>
        </div>
        
      )}
    </div>
  )
}