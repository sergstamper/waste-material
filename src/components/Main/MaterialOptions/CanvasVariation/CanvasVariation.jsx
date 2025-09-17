import PropTypes from 'prop-types';

import Checkbox from '../../../Common/Checkbox/Checkbox';
import RadioButton from '../../../Common/RadioButton/RadioButton';

import './CanvasVariation.css';

function CanvasVariation( { onChange, isStandardChecked, onStandardCheckboxChange } ) {
    return (
        <div className="container">
            <RadioButton
                id="wo-fields"
                name="canvas-option"
                value="zero"
                onChange={onChange}
                label="Без полей"
            />

            <RadioButton
                id="15-30"
                name="canvas-option"
                value="15x30"
                onChange={onChange}
                label="15×30"
            />

            <RadioButton
                id="17-45"
                name="canvas-option"
                value="17x45"
                onChange={onChange}
                label="17×45"
            />

            <RadioButton
                id="23-45"
                name="canvas-option"
                value="23x45"
                onChange={onChange}
                label="23×45"
            />

            <Checkbox
                id="standard"
                name="standard"
                value="standard"
                containerClassName={"standard-checkbox"}
                checked={isStandardChecked}
                onChange={onStandardCheckboxChange}
                label="Стандартная натяжка"
            />
        </div>
    )
}

CanvasVariation.propTypes = {
    onChange: PropTypes.func.isRequired,
    isStandardChecked: PropTypes.bool.isRequired,
    onStandardCheckboxChange: PropTypes.func.isRequired,
};

export default CanvasVariation;
