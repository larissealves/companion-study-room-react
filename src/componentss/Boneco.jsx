import { useEffect, useState } from 'react';

export default function Boneco() {
  const [posicao, setPosicao] = useState({ right: '30%', bottom: '15%' });
  const [sprite, setSprite] = useState('/assets/images/boneco/parado.png');

  useEffect(() => {
    // Animação de entrada
    setTimeout(() => {
      setPosicao({ right: '25%', bottom: '20%' });
      setSprite('/assets/images/boneco/andando1.png');
    }, 1000);

    setTimeout(() => {
      setSprite('/assets/images/boneco/sentado.png');
    }, 2000);
  }, []);

  return (
    <div 
      className="boneco" 
      style={{ 
        right: posicao.right, 
        bottom: posicao.bottom,
        transition: 'all 1s ease-in-out'
      }}
    >
      <img src={sprite} alt="Companheiro de Estudo" />
    </div>
  );
}