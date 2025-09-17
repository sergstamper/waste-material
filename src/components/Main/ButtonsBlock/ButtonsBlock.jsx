import PropTypes from 'prop-types';

import Button from '../../Common/Button/Button';

import './ButtonsBlock.css';

function ButtonsBlock({ onReset, onCalculate }) {
    return (
        <div className="buttons-block">
            <Button onClick={onReset} id='reset' className="button-reset" name="ОЧИСТИТЬ" />
            <Button onClick={onCalculate} id='calculate' className="button-calc" name="РАССЧИТАТЬ" />
        </div>
    );
}

ButtonsBlock.propTypes = {
    onReset: PropTypes.func.isRequired,
    onCalculate: PropTypes.func.isRequired,
};

export default ButtonsBlock;
