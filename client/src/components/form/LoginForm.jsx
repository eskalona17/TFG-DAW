import { useContext, useState } from "react";
import { AuthContext } from "../../context/authContext";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import Styles from "./form.module.css";
import { RiArrowGoBackFill } from "react-icons/ri";
import axios from "axios";

const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

const {
  input_container,
  form_container,
  errors_display,
  forgot_container,
  register_container,
  goback,
} = Styles;

export default function LoginForm() {
  // const authContext = useContext(AuthContext);
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm();

  const navigate = useNavigate();

  const [originalState, setOriginalState] = useState(true); // Nuevo estado para manejar el estado original

  const onSubmit = handleSubmit(async (data) => {
    try {
      // Aquí podrías realizar validaciones adicionales si es necesario
      console.log(data);
      
      // Enviar datos al backend
      const response = await axios.post(apiUrl + ":1234/api/users/login", data);
  
      // Verificar el estado de la respuesta
      if (response.status === 200) {
        alert("Bienvenido");
        navigate("/");
      } else {
        console.error("El usuario no existe:", response.statusText);
      }
    } catch (error) {
      console.error("Error:", error.message);
      alert("Error al iniciar sesión");
    }
    reset();
  });
  

  const [recoverPassword, setRecoverPassword] = useState(false);

  const handleForgotPasswordClick = () => {
    setOriginalState(false); // Cambiar al estado de recuperación de contraseña
    setRecoverPassword(true);
  };

  const handleGoBackClick = () => {
    setOriginalState(true); // Cambiar al estado original
    setRecoverPassword(false);
  };

  return (
    <div className={form_container}>
      {recoverPassword ? (
        <>
          <h3>Introduce tu email</h3>
          <form onSubmit={onSubmit}>
            {/* Email */}
            <div className={input_container}>
              <input
                type="text"
                label="email"
                name="email"
                {...register("email", {
                  required: {
                    value: true,
                    message: "email es requerido",
                  },
                  minLength: {
                    value: 2,
                    message: "email tiene que tener dos caracteres",
                  },
                  maxLength: {
                    value: 20,
                    message: "email no puede tener más de 20 caracteres",
                  },
                })}
              />
              <label htmlFor="email">Email</label>
            </div>
            <div className={errors_display}>
              {errors.email && <span>{errors.email.message}</span>}
            </div>
            <button type="submit" width="large">
              Enviar
            </button>
          </form>
          <div className={register_container}>
            <span className={goback} onClick={handleGoBackClick}>
              Volver
              <RiArrowGoBackFill />
            </span>
          </div>
        </>
      ) : (
        <>
          <h3>LOGIN</h3>
          <form onSubmit={onSubmit}>
            {/* username */}
            <div className={input_container}>
              <input
                type="text"
                label="input"
                name="input"
                {...register("input", {
                  required: {
                    value: true,
                    message: "Usuario o email es requerido",
                  },
                  minLength: {
                    value: 2,
                    message: "Usuario o email tiene que tener dos caracteres",
                  },
                  maxLength: {
                    value: 20,
                    message:
                      "Usuario o email no puede tener más de 20 caracteres",
                  },
                })}
              />
              <label htmlFor="input">Usuario o email</label>
            </div>
            <div className={errors_display}>
              {errors.input && <span>{errors.input.message}</span>}
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
              <span onClick={handleForgotPasswordClick}>
                ¿Olvidaste tu contraseña?
              </span>
            </div>
            <button type="submit">Entrar</button>
          </form>
        </>
      )}
      {originalState && !recoverPassword && (
        <div className={register_container}>
          <p>¿No tienes cuenta?</p>
          <Link to="/register">Registrate</Link>
        </div>
      )}
    </div>
  );
}
