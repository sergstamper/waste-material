import './Button.css';
import PropTypes from 'prop-types';

function Button({ onClick, name, id, className }) {
  return (
    <button onClick={onClick} id={id} className={`btn ${className}`}>{name}</button>
  );
}

export default Button;