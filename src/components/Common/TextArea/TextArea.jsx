import PropTypes from 'prop-types';

import './TextArea.css';

function TextArea({ 
        value, 
        onChange, 
        id, 
        label, 
        className 
    }) {
    return (
        <div className='textarea-container'>
        <label htmlFor={id}>{label}</label>
        <textarea
            className={`textarea-field ${className}`}
            value={value}
            onChange={onChange}
            id={id}
        />
        </div>
    );
}

TextArea.propTypes = {
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    id: PropTypes.string,
    label: PropTypes.string.isRequired,
    className: PropTypes.string
};

export default TextArea;
