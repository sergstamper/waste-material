import PropTypes from 'prop-types';

import Button from '../../Common/Button/Button';

import './DeleteModal.css';

function DeleteModal({ material, onConfirm, onCancel }) {
  return (
    <>
      <div className="info-block">
        <h2>
          Хотите удалить материал <br />
          <span className="material-name">{material?.description}?</span>
        </h2>
      </div>
      <div className="cancel-button-container">
        <Button onClick={onConfirm} name="УДАЛИТЬ" className="modal-delete-button" />
        <Button onClick={onCancel} name="ОТМЕНИТЬ" className="modal-cancel-button" />
      </div>
    </>
  );
}

DeleteModal.propTypes = {
  material: PropTypes.shape({
    description: PropTypes.string
  }),
  onConfirm: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired
};

export default DeleteModal;