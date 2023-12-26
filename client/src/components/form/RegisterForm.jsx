import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import Styles from "./form.module.css";
import axios from "axios";
import Button from "../button/Button";
import PrivacyModal from "../privacymodal/PrivacyModal";

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
} = Styles;

export default function Form() {
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
      // Enviar datos al backend
      const response = await axios.post(apiUrl + "/api/users/register", {
        ...data,
        profile: profile,
      });

      // if (!isPrivacyChecked) {
      //   alert("Debes aceptar la política de privacidad");
      //   return;
      // }

      if (response.status === 201) {
        console.log("Usuario registrado exitosamente");
        alert("Usuario registrado exitosamente");
        navigate("/login");
        reset();
      } else {
        console.error("Error al registrar usuario:", response.statusText);
        alert("Error al registrar usuario");
      }
    } catch (error) {
      console.error("Error:", error.message);
      alert("Error al registrar usuario");
    }
    reset();
  });

  //personal profile as a default
  const [profile, setProfile] = useState("personal");

  // check if ckeckbox is accepted
  const [isPrivacyChecked, setIsPrivacyChecked] = useState(false);

  // Estado para controlar la apertura y cierre del modal
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Función para abrir el modal
  const openModal = () => setIsModalOpen(true);

  // Función para cerrar el modal
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className={form_container}>
      <h3>Crea tu perfil</h3>
      <form>
        {/* name */}
        <div className={input_container}>
          <input
            type="text"
            label="Nombre"
            name="nombre"
            {...register("name", {
              required: {
                value: true,
                message: "El nombre es requerido",
              },
              minLength: {
                value: 2,
                message: "El nombre tiene que tener dos caracteres",
              },
              maxLength: {
                value: 20,
                message: "El nombre no puede tener más de 20 caracteres",
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
                message: "El usuario es requerido",
              },
              minLength: {
                value: 2,
                message: "El usuario tiene que tener dos caracteres",
              },
              maxLength: {
                value: 20,
                message: "El usuario no puede tener más de 20 caracteres",
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
        <div className={errors.email ? errors_display : ""}>
          {errors.email && <span>{errors.email.message}</span>}
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
                message: "La contraseña es requerida",
              },
              minLength: {
                value: 6,
                message: "La contraseña debe tener al menos 6 caracteres",
              },
            })}
          />
          <label htmlFor="password">Contraseña</label>
        </div>
        <div className={errors.password ? errors_display : ""}>
          {errors.password && <span>{errors.password.message}</span>}
        </div>

        {/* Confirm password */}
        <div className={input_container}>
          <input
            type="password"
            label="Confirmar contraseña"
            name="confirm_password"
            {...register("confirmPassword", {
              required: {
                value: true,
                message: "Confirmar contraseña es requerido",
              },
              validate: (value) =>
                value === watch("password") || "Las contraseñas no coinciden",
            })}
          />
          <label htmlFor="confirm_password">Confirmar contraseña</label>
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
                {...register("address", {
                  required: {
                    value: true,
                    message: "La dirección es requerida",
                  },
                })}
              />
              <label htmlFor="direccion">Dirección</label>
            </div>
            <div className={errors.address ? errors_display : ""}>
              {errors.address && <span>{errors.address.message}</span>}
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
                    message: "La ciudad es requerida",
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
                    type="number"
                    label="postal"
                    name="postal"
                    {...register("zipCode", {
                      required: {
                        value: true,
                        message: "El codigo postal requerido",
                      },
                      maxLength: {
                        value: 5,
                        message:
                          "El código postal debe tener como máximo 5 caracteres",
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
                    type="text"
                    label="pais"
                    name="pais"
                    {...register("country", {
                      required: {
                        value: true,
                        message: "El pais es requerido",
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
            {...register("privacyCheckbox", {
              required: {
                value: true,
                message: "Debes aceptar la política de privacidad",
              },
            })}
          />
          <label htmlFor="privacyCheckbox">
            Aceptar
            <span
              onClick={openModal}
              style={{
                cursor: "pointer",
                textDecoration: "underline",
                marginLeft: "5px",
              }}
            >
              Política de privacidad
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
          disabled={!isPrivacyChecked}
        />
      </form>
      <div className={register_container}>
        <p>¿Ya tienes cuenta?</p>
        <Link to="/login">Inicia sesión</Link>
      </div>
    </div>
  );
}
