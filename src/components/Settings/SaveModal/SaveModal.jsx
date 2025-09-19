import PropTypes from 'prop-types';

import Button from '../../Common/Button/Button';

import './SaveModal.css';

function SaveModal({ form, onConfirm, onCancel }) {
  return (
    <>
      <div className="info-block">
        <h2>
          Сохранить материал <br />
          <span className="material-name">{form.description || 'Без названия'}</span>?
        </h2>
      </div>
      <div className="cancel-button-container">
        <Button onClick={onConfirm} name="СОХРАНИТЬ" className="modal-save-button" />
        <Button onClick={onCancel} name="ОТМЕНИТЬ" className="modal-nosave-button" />
      </div>
    </>
  );
}

SaveModal.propTypes = {
  form: PropTypes.object.isRequired,
  onConfirm: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

export default SaveModal;