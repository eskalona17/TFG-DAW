import React, { useState } from "react";
import "./Input.css";

export const Input = ({
  type,
  name,
  error,
  icon,
  label
}) => {

  const [value, setValue] = useState('')

  function handleChange(e){
    setValue(e.target.value)
  }

  return (
    <div className="input-container">
      {icon && <i className={icon}></i>}
      <input className="input"
        type={type ? type : "text"}
        value={value} onChange={handleChange}
        name={name}
      />
      <label className={value && 'filled'} htmlFor={name}>{label}</label>
      {error && <p className="error">Input field can't be empty!</p>}
    </div>
  );
};
