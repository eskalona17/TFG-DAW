import { useContext } from "react";
import { AuthContext } from "../../context/authContext";
import { useForm } from "react-hook-form";
import { Button } from "../Button";
import { Link } from "react-router-dom";
import Styles from "./form.module.css";

const {
  input_container,
  form_container,
  errors_display,
  forgot_container,
  register_container,
} = Styles;

export default function LoginForm() {
  const authContext = useContext(AuthContext);
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = handleSubmit(async (data) => {
    try {
      // Llama a la función login del contexto para enviar los datos del usuario
      await authContext.login(data);
      alert("Datos enviados correctamente");
      reset();
    } catch (error) {
      console.error("Error al enviar datos:", error);
      // Maneja el error según tus necesidades
    }
  });

  return (
    <div className={form_container}>
      <h3>LOGIN</h3>
      <form onSubmit={onSubmit}>
        {/* username */}
        <div className={input_container}>
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
        <div className={errors_display}>
          {errors.usuario && <span>{errors.usuario.message}</span>}
        </div>

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
        <div className={forgot_container}>
          <Link to="/forgot-password">¿Olvidaste tu contraseña?</Link>
        </div>

        <Button type="submit" width="large">
          Entrar
        </Button>
      </form>
      <div className={register_container}>
        <p>¿No tienes cuenta?</p>
        <Link to="/register">Registrate</Link>
      </div>
    </div>
  );
}
