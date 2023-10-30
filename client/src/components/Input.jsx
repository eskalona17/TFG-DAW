import React from "react";
import styled from "styled-components";

const InputComponent = styled.input`
  display: flex;
  flex-direction: column;
  margin: 10px 0;
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
  onChange
}) => {
  return (
    <>
      <InputComponent
        type={type ? type : "text"}
        value={value}
        name={name}
        placeholder={placeholder}
        onChange={onChange}
        disabled={disabled}
      />
      {error && (
        <ErrorComponent>
          <p className="error">Input field can't be empty!</p>
        </ErrorComponent>
      )}
    </>
  );
};
