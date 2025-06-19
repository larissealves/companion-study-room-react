import React from 'react';

function popupSessionCompleted({ onClose }) {
  const closePopUp = () => {
    onClose();
  };

  return (
    <div className="modal-overlay ">
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

export default popupSessionCompleted;
