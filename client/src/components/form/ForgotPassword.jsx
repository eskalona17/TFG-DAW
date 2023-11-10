
import { useForm } from "react-hook-form";
import { Button } from "../Button";
import styled from "styled-components";

const FormContainer = styled.div`
  min-width: 400px;
  background-color: var(--bg-white-color);
  padding: 20px;
  border-radius: 0.3rem;
`;

const ErrorsDisplay = styled.div`
  display: flex;
  color: tomato;
  font-size: x-small;
`;

export default function ForgotPassword() {
  const {
    handleSubmit,
    register,
    watch,
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
      <h3>Recupera tu contraseña</h3>
      <form onSubmit={onSubmit}>
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

        {/* Confirm password */}
        <div className="input-container">
          <input
            type="password"
            label="Confirmar contraseña"
            name="confirm_password"
            {...register("confirm_password", {
              required: {
                value: true,
                message: "Repetir contraseña es requerido",
              },
              validate: (value) =>
                value === watch("password") || "Las contraseñas no coinciden",
            })}
          />
          <label htmlFor="confirm_contraseña">Repite contraseña</label>
        </div>
        <ErrorsDisplay>
          {errors.confirm_password && (
            <span>{errors.confirm_password.message}</span>
          )}
        </ErrorsDisplay>

        <Button type="submit" width="large">
          Enviar
        </Button>
      </form>
    </FormContainer>
  );
}
