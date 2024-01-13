import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import Styles from "./form.module.css";
import { RiArrowGoBackFill } from "react-icons/ri";
import Button from "../button/Button";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

const {
  input_container,
  form_container,
  errors_display,
  forgot_container,
  register_container,
  goback,
  button,
} = Styles;

export default function LoginForm () {
  const { login } = useContext(AuthContext);
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm();

  const navigate = useNavigate();

  const [originalState, setOriginalState] = useState(true); // Nuevo estado para manejar el estado original

  const [showPassword, setShowPassword] = useState(false); // show or hide password

  const onSubmitLogin = handleSubmit(async (data) => {
    try {
      // Use the login function from the context and await its completion
      await login(data);
      // Now that the login is complete, you can proceed with other actions
      toast.success('Bienvenido', {
        position: 'top-center',
        autoClose: 3000, theme:"colored"
      });
      navigate("/");
    } catch (error) {
      console.error("Error:", error.message);
      toast.error('Error al iniciar sesión', {
        position: 'top-center',
        autoClose: 3000, theme:"colored"
      });
    }
    reset();
  });

  const onSubmitForgotPassword = handleSubmit(async (data) => {
    try {
      await axios.post(apiUrl + "/api/users/forget-password", data);

    } catch (error) {
      console.error("Error:", error.response.data.error || "Internal server error");
    } finally {
      toast.success('E-mail enviado correctamente', {
        position: 'top-center',
        autoClose: 3000, theme:"colored"
      });
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
          <form onSubmit={onSubmitForgotPassword} noValidate>
            {/* Email */}
            <div className={input_container}>
              <input
                type="email"
                name="email"
                {...register("email", {
                  required: {
                    value: true,
                    message: "El email es requerido",
                  },
                  pattern: {
                    value: /^[a-z0-9._%+-]+@[a-z0-9·-]+\.[a-z]{2,4}$/,
                    message: "El email no es valido",
                  },
                })}
              />
              <label htmlFor="email">Email</label>
            </div>
            <div className={errors_display}>
              {errors.email && <span>{errors.email.message}</span>}
            </div>
            <Button
              text="Enviar"
              className={button}
              type="submit"
              variant="primary-large"
            />
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
          <h3>Inicia sesión</h3>
          <form onSubmit={onSubmitLogin}>
            {/* username */}
            <div className={input_container}>
              <input
                type="text"
                label="input"
                name="input"
                {...register("input", {
                  required: {
                    value: true,
                    message: "El usuario o email es obligatorio",
                  },
                  minLength: {
                    value: 3,
                    message: "El usuario o email debe tener un mínimo de tres caracteres",
                  },
                  maxLength: {
                    value: 50,
                    message:
                      "El usuario o email no debe tener más de 50 caracteres",
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
                  }
                })}
              />
              <label htmlFor="contraseña">Contraseña</label>
              <div
                className={Styles.showPasswordIcon}
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
            <div className={forgot_container}>
              <span onClick={handleForgotPasswordClick}>
                ¿Olvidaste tu contraseña?
              </span>
            </div>
            <Button
              text="Entrar"
              className={button}
              type="submit"
              variant="primary-large"
            />
          </form>
        </>
      )}
      {originalState && !recoverPassword && (
        <div className={register_container}>
          <p>¿No tienes cuenta?</p>
          <Link to="/register">Regístrate</Link>
        </div>
      )}
    </div>
  );
}
