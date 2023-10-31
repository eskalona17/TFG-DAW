import styled from "styled-components";
import "./../variables.css";

const ButtonComponent = styled.button`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  vertical-align: middle;
  cursor: pointer;
  user-select: none;
  border-radius: 0.375rem;
  margin: 10px 0;
  padding: 0;
  color: ${(props) =>
    props.color === "light-color"
      ? "var(--white-color)"
      : props.color === "dark-color"
      ? "var(--dark-color)"
      : "var(--white-color)"};
  ${(props) =>
    props.size === "sm"
      ? "1.1rem"
      : props.size === "md"
      ? "1.4rem"
      : props.size === "lg"
      ? "1.6rem"
      : "1.1rem"};
  width: ${(props) =>
    props.width === "small"
      ? "100px" // Ancho para tamaño pequeño
      : props.width === "medium"
      ? "150px" // Ancho para tamaño mediano
      : props.width === "large"
      ? "100%" // Ancho para tamaño grande
      : "150px"}; // Ancho predeterminado (puedes ajustarlo)
  height: 35px;
  font-family: ${(props) => props.fontFamily || "var(--main-font, 'Inter')"};
  font-weight: ${(props) => props.fontWeight || 500};
  border: 1px solid transparent;
  background-color: ${(props) =>
    props.variant === "light"
      ? "var(--orange-color)"
      : props.variant === "dark"
      ? "var(--dark-color)"
      : "var(--orange-color)"};
`;

export const Button = ({
  type,
  variant,
  className,
  onClick,
  children,
  fontFamily,
  color,
  width,
}) => {
  return (
    <ButtonComponent
      type={type ? type : "button"}
      variant={variant}
      className={className ? `btn-component ${className}` : "btn-component"}
      color={color}
      onClick={onClick}
      fontFamily={fontFamily}
      width={width}
    >
      {children}
    </ButtonComponent>
  );
};
