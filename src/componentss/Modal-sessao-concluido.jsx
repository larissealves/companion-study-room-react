import React from 'react';
import '../modal-conf.css';

function PopupSessaoEstudoFinalizado({ onCloser }) {
  const closePopUp = () => {
    onCloser();
  };

  return (
    <div className="modal-overlay modal-sessao-finalizada">
      <div className="modal">
        <h2>STUDY SESSION COMPLETED!</h2>
        <div className="footer">
          <button
            className="btn-primario"
            onClick={closePopUp}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default PopupSessaoEstudoFinalizado;
