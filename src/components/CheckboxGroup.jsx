function CheckboxGroup({ id, name, checked, onCheckboxChange, value }) {
  return (
    <div className="checkbox-group">
      <input
        value={value}
        id={id}
        type="checkbox"
        className="checkbox"
        checked={checked}
        onChange={onCheckboxChange}
      />{" "}
      <label className="checkbox-label" htmlFor={id}>
        {name}
      </label>
    </div>
  );
}

export default CheckboxGroup;
