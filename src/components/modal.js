import React from 'react';
import ReactDOM from 'react-dom';

const Modal = ({ open, title, text, confirmButtonText, onClose, onConfirm }) => {
  if (!open) {
    return null;
  }

  return ReactDOM.createPortal(
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-header">
          <h2>{title}</h2>
          <button className="close-button" onClick={onClose}>
            &times;
          </button>
        </div>
        <div className="modal-content">
          <p>{text}</p>
        </div>
        <div className="modal-footer">
          <button className="confirm-button" onClick={onConfirm}>
            {confirmButtonText}
          </button>
        </div>
      </div>
    </div>,
    document.getElementById('modal-root') // Ensure you have a div with id 'modal-root' in your index.html
  );
};

export default Modal;