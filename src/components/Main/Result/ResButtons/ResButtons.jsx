import PropTypes from 'prop-types';

import Button from '../../../Common/Button/Button';

import './ResButtons.css';

function ResButtons({ onVariantClick, onCopy }) {
    return (
        <div className="res-buttons">
            <Button onClick={onVariantClick} name='ВАРИАНТЫ' id='options' className="res-btn button-data" />
            <Button onClick={onCopy} name='КОПИРОВАТЬ' id='copy' className="res-btn button-copy" />
        </div>
    );
}

ResButtons.propTypes = {
    onVariantClick: PropTypes.func.isRequired,
    onCopy: PropTypes.func.isRequired,
};

export default ResButtons;
