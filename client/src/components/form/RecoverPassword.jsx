import { useParams, useNavigate } from "react-router-dom";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import Button from "@/components/button/Button";
import 'react-toastify/dist/ReactToastify.css';
import { useForm } from "react-hook-form";
import Styles from "./form.module.css";
import { toast } from 'react-toastify';
import { useState } from "react";
import axios from "axios";

const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

const { input_container, form_container, errors_display, showPasswordIcon } = Styles;

export default function RecoverPassword() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
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
    try {
      await axios.post(apiUrl + `/api/users/reset-password/${token}`, data);
      toast.success('La contraseña ha sido modificada', {
        position: 'top-center',
        autoClose: 3000, theme:"colored"
      });
      navigate("/login");
    } catch (error) {
      console.error(
        "Error:",
        error.response.data.error || "Internal server error"
      );
      toast.error('Ha ocurrido un error', {
        position: 'top-center',
        autoClose: 3000, theme:"colored"
      });
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
             type={showPassword ? "text" : "password"}
            label="Contraseña"
            name="password"
            {...register("password", {
              required: {
                value: true,
                message: "La contraseña es obligatoria",
              },
              minLength: {
                value: 6,
                message: "La contraseña debe tener un mínimo de 6 caracteres",
              },
            })}
          />
          <label htmlFor="contraseña">Contraseña</label>
          <div
            className={showPasswordIcon}
            onMouseDown={() => setShowPassword(true)}
            onMouseUp={() => setShowPassword(false)}
            onMouseLeave={() => setShowPassword(false)}
          >
            {showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
          </div>
        </div>
        <div className={errors_display}>
          {errors.password && <span>{errors.password.message}</span>}
        </div>

        {/* Confirm password */}
        <div className={input_container}>
          <input
             type={showConfirmPassword ? "text" : "password"}
            label="Confirmar contraseña"
            name="confirmPassword"
            {...register("confirmPassword", {
              required: {
                value: true,
                message: "Introduce nuevamente la contraseña",
              },
              validate: (value) =>
                value === watch("password") || "Las contraseñas no coinciden",
            })}
          />
          <label htmlFor="confirm_contraseña">Repite contraseña</label>
          <div
            className={showPasswordIcon}
            onMouseDown={() => setShowConfirmPassword(true)}
            onMouseUp={() => setShowConfirmPassword(false)}
            onMouseLeave={() => setShowConfirmPassword(false)}
          >
            {showConfirmPassword ? <FaRegEye /> : <FaRegEyeSlash />}
          </div>
        </div>
        <div className={errors_display}>
          {errors.confirmPassword && (
            <span>{errors.confirmPassword.message}</span>
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
