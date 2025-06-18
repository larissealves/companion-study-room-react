import React from 'react';

function PopupSessaoEstudoFinalizado({ onCloser }) {
  const closePopUp = () => {
    onCloser();
  };

  return (
    <div className="modal-overlay modal-sessao-finalizada">
      <div className="modal alert">
        <h2>STUDY SESSION COMPLETED!</h2>
        <div className="footer">
          <button
            className="btn-primary"
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
