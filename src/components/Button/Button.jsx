function Button({ onClick, name, id }) {
  return (
    <button onClick={onClick} id={id}>{name}</button>
  );
}

export default Button;