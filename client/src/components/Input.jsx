import React from "react";
import styled from "styled-components";

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 10px 0;
  position: relative;
  width: 300px;
  border-bottom: 1px solid var(--dark-line);
  input:focus ~ label {
    top: -5px;
  }
  input:valid ~ label {
    top: -5px;
  }
`;

const InputIcon = styled.i`
  /* Estilos para el ícono si es necesario */
`;

const InputComponent = styled.input`
  width: 100%;
  height: 50px;
  background-color: transparent;
  border: none;
`;

const InputLabel = styled.label`
  position: absolute;
  top: 50%;
  left: 5px;
  transform: translateY(-50%);
  color: white;
  font-size: 1rem;
  transition: .6s;
`;

const ErrorComponent = styled.div`
  color: #db4437;
  font-size: 14px;
  font-weight: 400;
  margin-left: 12px;
  margin-top: 4px;
`;

export const Input = ({
  type,
  value,
  name,
  placeholder,
  error,
  disabled,
  onChange,
  icon,
}) => {
  return (
    <InputContainer className="your-class">
      <InputIcon>{icon && <i className={icon}></i>}</InputIcon>
      <InputComponent
        type={type ? type : "text"}
        value={value}
        name={name}
        placeholder={placeholder}
        onChange={onChange}
        disabled={disabled}
      />
      <InputLabel htmlFor={name}>{name}</InputLabel>
      {error && (
        <ErrorComponent>
          <p className="error">Input field can't be empty!</p>
        </ErrorComponent>
      )}
    </InputContainer>
  );
};
