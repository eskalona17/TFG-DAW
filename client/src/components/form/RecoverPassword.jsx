import { useForm } from "react-hook-form";
import Styles from "./form.module.css";
import Button from "../button/Button";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

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

  const { token } = useParams();
  const navigate = useNavigate();

  const onSubmit = handleSubmit(async (data) => {
    console.log(data);
    try {
      await axios.post(apiUrl + `/api/users/reset-password/${token}`, data);
      alert("contraseña cambiada");
      navigate("/login");
    } catch (error) {
      console.error(
        "Error:",
        error.response.data.error || "Internal server error"
      );
    }
    reset();
  });

  return (
    <div className={form_container}>
      <h3>Reestablece tu contraseña</h3>
      <form>
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
            name="confirmPassword"
            {...register("confirmPassword", {
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
          {errors.confirmPassword && (
            <span>{errors.confirmPassword.message}</span>
          )}
        </div>
        <Button
          text="Enviar"
          onClick={onSubmit}
          className={button}
          type="submit"
          variant="primary-large"
        />
      </form>
    </div>
  );
}
