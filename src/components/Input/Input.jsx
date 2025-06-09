function Input({ value, onChange, id }) {
  return (
    <input
      type="text"
      value={value}
      onChange={onChange}
      id={id}
    />
  );
}

export default Input;