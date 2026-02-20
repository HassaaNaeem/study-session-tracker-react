function FormGroup({
  children,
  inputType,
  placeholder,
  select,
  options,
  value,
  onChange,
}) {
  return (
    <div className="form-group">
      <label className="label">{children}</label>
      {inputType && (
        <input
          type={inputType}
          value={value}
          onChange={onChange}
          className="input"
          placeholder={placeholder}
        />
      )}
      {select && (
        <select
          name=""
          className="input"
          id=""
          onChange={onChange}
          value={value}
        >
          {options.map((option) => (
            <option value={option.split(" ")[0].toLowerCase()}>{option}</option>
          ))}
        </select>
      )}
    </div>
  );
}

export default FormGroup;
