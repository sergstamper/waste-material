function Button({ onClick, name, id, className }) {
  return (
    <button onClick={onClick} id={id} className={`button ${className}`}>{name}</button>
  );
}

export default Button;