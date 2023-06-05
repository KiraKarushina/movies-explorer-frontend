
function CustomInput({ title, name, type, error, disabled = false, onChange}) {

  return (
    <label className="input-label text color_text">
      {title}
      <input
        id={name}
        name={name}
        type={type}
        className={`input ${error && "color_error"}`}
        onChange={onChange}
        disabled={disabled}
        required
        minLength={2}
        maxLength={32}
      ></input>
      <span className={`input-error ${error && "input-error_visible"} text`}>{error}</span>
    </label>
  );
}

export default CustomInput;