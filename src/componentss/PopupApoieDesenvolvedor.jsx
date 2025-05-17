import React from 'react';
import '../modal-conf.css';

function PopupApoieDesenvolvedor({ onClose }) {
  return (
    <div className="modal-overlay modal-sessao-finalizada">
      <div className="modal">
        <h2>💜 Support the Developer</h2>

        <p>If this project helped you focus or brought you joy, consider supporting with a coffee ☕</p>

        <ul style={{ lineHeight: '1.8', marginTop: '12px' }}>
          <li>💌 <strong>PayPal:</strong> alves.larisser@gmail.com</li>
          <li>🌍 <strong>Wise:</strong> larisser4</li>
        </ul>

        <p style={{ marginTop: '20px' }}>
          You can also find me here: <br />
          <a
            className="link-neon"
            href="https://linktr.ee/larisseralves"
            target="_blank"
            rel="noopener noreferrer"
          >
            🌐 Larisse Alves – Linktree
          </a>
        </p>

        <div className="footer" style={{ marginTop: '24px' }}>
          <button className="btn-primario" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default PopupApoieDesenvolvedor;
