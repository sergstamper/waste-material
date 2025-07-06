import { createPortal } from 'react-dom';
import Button from '../Button/Button';
import './Modal.css';
import PropTypes from 'prop-types';

function Modal({ isOpen, onClose, children }) {
  if (!isOpen) return null;

  return createPortal(
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        {children}
        <div className="close-button-container">
          <Button onClick={onClose} name="ЗАКРЫТЬ" className="modal-close-button" />
        </div>
      </div>
    </div>,
    document.body
  );
}
Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node
};

export default Modal;
