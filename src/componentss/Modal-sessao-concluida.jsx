import React from 'react';
import '../modal-conf.css';

function PopupSessaoEstudoFinalizada ({onCloser}) {
    const closePopUp = () => {
        onCloser();
    };

    return (
        <div className="modal-overlay modal-sessao-finalizada">
            <div className="modal">
                <h2>SESSÃO DE ESTUDOS FINALIZADA!</h2>
                <div className="footer"> 
                    <button
                        className="btn-primario"
                        onClick={closePopUp}
                    >
                        close
                    </button>
                </div>
                
            </div>
        </div>

    );
}

export default PopupSessaoEstudoFinalizada;