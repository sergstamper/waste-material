import PropTypes from 'prop-types';

import './Checkbox.css';

function Checkbox({ 
        id, 
        checked, 
        disabled, 
        label = '', 
        className, 
        containerClassName, 
        onChange 
    }) {
    return (
        <div className={`checkbox-container ${containerClassName}`}>
            <input
                onChange={onChange}
                type="checkbox"
                id={id}
                checked={checked}
                disabled={disabled}
                className={className}
            />
            <label htmlFor={id}>{label}</label>
        </div>
    );
}

Checkbox.propTypes = {
    id: PropTypes.string.isRequired,
    checked: PropTypes.bool,
    disabled: PropTypes.bool,
    label: PropTypes.string,
    className: PropTypes.string,
    containerClassName: PropTypes.string,
    onChange: PropTypes.func
};

export default Checkbox;
