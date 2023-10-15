import React, { useState } from 'react';
import PropTypes from 'prop-types';

const Modal = ({ isOpen, onClose, title, content }) => {
  const [isOpenState, setIsOpenState] = useState(isOpen);

  const handleClose = () => {
    setIsOpenState(false);
    onClose();
  };

  return (
    <div className={`modal ${isOpenState ? 'open' : 'closed'}`}>
      <div className="modal-content">
        <h2>{title}</h2>
        <p>{content}</p>
        <button onClick={handleClose}>Close</button>
      </div>
    </div>
  );
};

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
};

export default Modal;