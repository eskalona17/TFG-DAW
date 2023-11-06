import { useForm } from "react-hook-form";
import { Button } from "../Button";
import styled from "styled-components";
import { Link } from "react-router-dom";
import "./Form.css";

const FormContainer = styled.div`
  min-width: 400px;
  background-color: var(--bg-white-color);
  padding: 20px;
  border-radius: 0.3rem;
`;

const RegisterContainer = styled.div`
  display: flex;
  justify-content: end;
  align-items: center;
  gap: 10px;
`;

const ForgotPassword = styled.div`
text-align: end;
margin-top: 20px;
margin-bottom: 40px
`

const ErrorsDisplay = styled.div`
  display: flex;
  color: tomato;
  font-size: x-small;
`;

export default function LoginForm() {
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = handleSubmit((data) => {
    // event.preventDefault()
    console.log(data);
    alert("enviando datos...");
    reset();
  });

  return (
    <FormContainer>
      <h3>LOGIN</h3>
      <form onSubmit={onSubmit}>
        {/* username */}
        <div className="input-container">
          <input
            type="text"
            label="usuario"
            name="usuario"
            {...register("usuario", {
              required: {
                value: true,
                message: "Usuario es requerido",
              },
              minLength: {
                value: 2,
                message: "Usuario tiene que tener dos caracteres",
              },
              maxLength: {
                value: 20,
                message: "Usuario no puede tener más de 20 caracteres",
              },
            })}
          />
          <label htmlFor="usuario">Usuario</label>
        </div>
        <ErrorsDisplay>
          {errors.usuario && <span>{errors.usuario.message}</span>}
        </ErrorsDisplay>

        {/* password */}
        <div className="input-container">
          <input
            type="password"
            label="Contraseña"
            name="password"
            {...register("password", {
              required: {
                value: true,
                message: "Password es requerido",
              },
              minLength: {
                value: 6,
                message: "La contraseña debe tener al menos 6 caracteres",
              },
            })}
          />
          <label htmlFor="contraseña">Contraseña</label>
        </div>
        <ErrorsDisplay>
          {errors.password && <span>{errors.password.message}</span>}
        </ErrorsDisplay>
        <ForgotPassword>
        <Link to="/forgot-password">¿Olvidaste tu contraseña?</Link>
      </ForgotPassword>

        <Button type="submit" width="large">
          Entrar
        </Button>
      </form>
      <RegisterContainer>
        <p>¿No tienes cuenta?</p>
        <Link to="/register">Registrate</Link>
      </RegisterContainer>
    </FormContainer>
  );
}
