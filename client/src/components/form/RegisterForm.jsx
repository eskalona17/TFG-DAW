import PrivacyModal from "@/components/privacymodal/PrivacyModal";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import Button from "@/components/button/Button";
import 'react-toastify/dist/ReactToastify.css';
import { useForm } from "react-hook-form";
import Styles from "./form.module.css";
import { toast } from 'react-toastify';
import { useState } from "react";
import axios from "axios";

const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

const {
  input_container,
  form_container,
  errors_display,
  register_container,
  tabs,
  addedInputs,
  inputs_errors,
  button,
  input_LOPD,
  showPasswordIcon,
  privacyLink,
  privacyCheckbox
} = Styles;

export default function Form () {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  //personal profile as a default
  const [profile, setProfile] = useState("personal");

  const {
    handleSubmit,
    watch,
    register,
    formState: { errors },
    reset,
  } = useForm();

  const navigate = useNavigate();

  const onSubmit = handleSubmit(async (data) => {
    try {
      const commonData = {
        name: data.name,
        username: data.username,
        email: data.email,
        password: data.password,
        confirmPassword: data.confirmPassword,
        profile: data.profile
      };

      if (data.profile === "profesional" && (data.street || data.city || data.zipCode || data.country)) {
        commonData.address = {
          street: data.street,
          city: data.city,
          zipCode: data.zipCode ? Number(data.zipCode) : undefined,
          country: data.country,
        };
      }
      // Enviar datos al backend
      const response = await axios.post(apiUrl + "/api/users/register", {
        ...commonData,
        profile,
      });

      if (response.status === 201) {
        toast.success('Usuario registrado correctamente', {
          position: 'top-center',
          autoClose: 3000, theme: "colored"
        });
        navigate("/login");
        reset();
      } else {
        console.error("Error al registrar usuario:", response.statusText);
        toast.error('Ha ocurrido un error', {
          position: 'top-center',
          autoClose: 3000, theme: "colored"
        });
      }
    } catch (error) {
      console.error("Error:", error.message);
      if (error.response && error.response.status === 409 && error.response.data && error.response.data.error && error.response.data.type) {
        const conflictError = error.response.data.error;
        const conflictType = error.response.data.type;

        let errorMessage;

        if (conflictType === 'username') {
          errorMessage = 'El nombre de usuario ya está registrado';
        } else if (conflictType === 'email') {
          errorMessage = 'El correo electrónico ya está registrado';
        } else {
          errorMessage = 'Ha ocurrido un error';
        }

        console.error("Conflicto:", conflictError);
        toast.error(errorMessage, {
          position: 'top-center',
          autoClose: 3000, theme: "colored"
        });
      } else {
        toast.error('Ha ocurrido un error', {
          position: 'top-center',
          autoClose: 3000, theme: "colored"
        });
      }
    }
  });


  // Estado para controlar la apertura y cierre del modal
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Función para abrir el modal
  const openModal = () => setIsModalOpen(true);

  // Función para cerrar el modal
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className={form_container}>
      <h3>Crea tu perfil</h3>
      <form onSubmit={onSubmit}>
        {/* name */}
        <div className={input_container}>
          <input
            type="text"
            label="Nombre"
            name="nombre"
            {...register("name", {
              required: {
                value: true,
                message: "El nombre es obligatorio",
              },
              minLength: {
                value: 3,
                message: "El nombre debe tener un mínimo de tres caracteres",
              },
              maxLength: {
                value: 20,
                message: "El nombre no debe tener más de 20 caracteres",
              },
            })}
          />
          <label htmlFor="nombre">Nombre completo</label>
        </div>
        <div className={errors.name ? errors_display : ""}>
          {errors.name && <span>{errors.name.message}</span>}
        </div>

        {/* username */}
        <div className={input_container}>
          <input
            type="text"
            label="usuario"
            name="usuario"
            {...register("username", {
              required: {
                value: true,
                message: "El nombre de usuario es obligatorio",
              },
              minLength: {
                value: 3,
                message: "El nombre de usuario debe tener un mínimo de tres caracteres",
              },
              maxLength: {
                value: 20,
                message: "El nombre de usuario no debe tener más de 20 caracteres",
              },
            })}
          />
          <label htmlFor="usuario">Usuario</label>
        </div>
        <div className={errors.username ? errors_display : ""}>
          {errors.username && <span>{errors.username.message}</span>}
        </div>

        {/* Email */}
        <div className={input_container}>
          <input
            type="email"
            label="email"
            name="email"
            {...register("email", {
              required: {
                value: true,
                message: "El email es obligatorio",
              },
              pattern: {
                value: /^[a-z0-9._%+-]+@[a-z0-9·-]+\.[a-z]{2,4}$/,
                message: "El email no es válido",
              },
            })}
          />
          <label htmlFor="email">Email</label>
        </div>
        <div className={errors.email ? errors_display : ""}>
          {errors.email && <span>{errors.email.message}</span>}
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
              },
            })}
          />
          <label htmlFor="password">Contraseña</label>
          <div
            className={showPasswordIcon}
            onMouseDown={() => setShowPassword(true)}
            onMouseUp={() => setShowPassword(false)}
            onMouseLeave={() => setShowPassword(false)}
          >
            {showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
          </div>
        </div>
        <div className={errors.password ? errors_display : ""}>
          {errors.password && <span>{errors.password.message}</span>}
        </div>

        {/* Confirm password */}
        <div className={input_container}>
          <input
            type={showConfirmPassword ? "text" : "password"}
            label="Confirmar contraseña"
            name="confirm_password"
            {...register("confirmPassword", {
              required: {
                value: true,
                message: "Introduce nuevamente la contraseña",
              },
              validate: (value) =>
                value === watch("password") || "Las contraseñas no coinciden",
            })}
          />
          <label htmlFor="confirm_password">Confirmar contraseña</label>
          <div
            className={showPasswordIcon}
            onMouseDown={() => setShowConfirmPassword(true)}
            onMouseUp={() => setShowConfirmPassword(false)}
            onMouseLeave={() => setShowConfirmPassword(false)}
          >
            {showConfirmPassword ? <FaRegEye /> : <FaRegEyeSlash />}
          </div>
        </div>
        <div className={errors.confirmPassword ? errors_display : ""}>
          {errors.confirmPassword && (
            <span>{errors.confirmPassword.message}</span>
          )}
        </div>

        {/* choose profesional or personal */}
        <ul className={tabs}>
          <li
            onClick={() => {
              setProfile("personal");
            }}
            className={profile === "personal" ? Styles.active : ""}
          >
            Personal
          </li>
          <li
            onClick={() => {
              setProfile("profesional");
            }}
            className={profile === "profesional" ? Styles.active : ""}
          >
            Profesional
          </li>
        </ul>

        {profile === "profesional" && (
          <>
            {/* address */}
            <div className={input_container}>
              <input
                type="text"
                label="direccion"
                name="direccion"
                {...register("street", {
                  required: {
                    value: true,
                    message: "La dirección es obligatoria",
                  },
                })}
              />
              <label htmlFor="direccion">Dirección</label>
            </div>
            <div className={errors.street ? errors_display : ""}>
              {errors.street && <span>{errors.street.message}</span>}
            </div>

            {/* ciudad */}
            <div className={input_container}>
              <input
                type="text"
                label="ciudad"
                name="ciudad"
                {...register("city", {
                  required: {
                    value: true,
                    message: "La ciudad es obligatoria",
                  },
                  minLength: {
                    value: 3,
                    message: "La ciudad debe tener un mínimo de 3 caracteres",
                  },
                  maxLength: {
                    value: 50,
                    message: "La ciudad no debe tener más de 50 caracteres",
                  },
                })}
              />
              <label htmlFor="ciudad">Ciudad</label>
            </div>
            <div className={errors.city ? errors_display : ""}>
              {errors.city && <span>{errors.city.message}</span>}
            </div>

            <div className={addedInputs}>
              <div className={inputs_errors}>
                {/* codigo postal */}
                <div className={input_container}>
                  <input
                    type="text"
                    label="postal"
                    name="postal"
                    {...register("zipCode", {
                      required: {
                        value: true,
                        message: "El código postal es obligatorio",
                      },
                      maxLength: {
                        value: 5,
                        message:
                          "El código postal debe tener un máximo de 5 caracteres",
                      },
                    })}
                  />
                  <label htmlFor="postal">Código postal</label>
                </div>
                <div className={errors.zipCode ? errors_display : ""}>
                  {errors.zipCode && <span>{errors.zipCode.message}</span>}
                </div>
              </div>
              <div className={inputs_errors}>
                {/* pais */}
                <div className={input_container}>
                  <input
                    readOnly
                    value="España"
                    type="text"
                    label="pais"
                    name="pais"
                    {...register("country", {
                      required: {
                        value: true,
                        message: "El país es obligatorio",
                      },
                    })}
                  />
                  <label htmlFor="pais">Pais</label>
                </div>
                <div className={errors.country ? errors_display : ""}>
                  {errors.country && <span>{errors.country.message}</span>}
                </div>
              </div>
            </div>
          </>
        )}

        {/* Política de privacidad */}
        <div className={input_LOPD}>
          <input
            type="checkbox"
            id="privacyCheckbox"
            className={privacyCheckbox}
            {...register("privacyCheckbox", {
              required: {
                value: true,
                message: "Debes aceptar la Política de Privacidad",
              },
            })}
          />
          <label htmlFor="privacyCheckbox">
            Aceptar
            <span
              onClick={openModal}
              className={privacyLink}
            >
              Política de Privacidad
            </span>
          </label>
          {/* Componente PrivacyModal */}
          <PrivacyModal isOpen={isModalOpen} closeModal={closeModal} />
        </div>
        <div className={errors.privacyCheckbox ? errors_display : ""}>
          {errors.privacyCheckbox && (
            <span>{errors.privacyCheckbox.message}</span>
          )}
        </div>

        <Button
          text="Enviar"
          className={button}
          onClick={onSubmit}
          type="submit"
          variant="primary-large"
        />
      </form>
      <div className={register_container}>
        <p>¿Ya tienes cuenta?</p>
        <Link to="/login">Inicia sesión</Link>
      </div>
    </div>
  );
}
