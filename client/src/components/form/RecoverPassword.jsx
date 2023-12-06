import { useForm } from "react-hook-form";
import Styles from "./form.module.css";
import Button from "../button/Button";
import axios from "axios";

const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;


const { input_container, form_container, errors_display } = Styles;

export default function RecoverPassword() {
  const {
    handleSubmit,
    register,
    watch,
    formState: { errors },
    reset,
    button,
  } = useForm();

  const onSubmit = handleSubmit(async (data) => {
    // event.preventDefault()
    try {
      const response = await axios.post(apiUrl + '/api/users/reset-password', data);
      console.log(response.data);

    } catch (error) {
      console.error('Error:', error.response.data.error || 'Internal server error');
    }
    reset();
  });

  return (
    <div className={form_container}>
      <h3>Reestablece tu contraseña</h3>
      <form onSubmit={onSubmit}>
        {/* password */}
        <div className={input_container}>
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
        <div className={errors_display}>
          {errors.password && <span>{errors.password.message}</span>}
        </div>

        {/* Confirm password */}
        <div className={input_container}>
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
        <div className={errors_display}>
          {errors.confirm_password && (
            <span>{errors.confirm_password.message}</span>
          )}
        </div>
        <Button
          text="Enviar"
          className={button}
          type="submit"
          variant="primary-large"
        />
      </form>
    </div>
  );
}
