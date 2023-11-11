import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "../Button";
import { Link } from "react-router-dom";
import Styles from "./form.module.css";

const {
  input_container,
  form_container,
  errors_display,
  register_container,
  tabs,
  addedInputs,
  inputs_errors
} = Styles;

export default function Form() {
  const {
    handleSubmit,
    watch,
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

  //personal profile as a default
  const [profile, setProfile] = useState("personal");

  return (
    <div className={form_container}>
      <h3>Crea tu perfil</h3>
      <form onSubmit={onSubmit}>
        {/* Nombre */}
        <div className={input_container}>
          <input
            type="text"
            label="Nombre"
            name="nombre"
            {...register("nombre", {
              required: {
                value: true,
                message: "Nombre es requerido",
              },
              minLength: {
                value: 2,
                message: "Nombre tiene que tener dos caracteres",
              },
              maxLength: {
                value: 20,
                message: "Nombre no puede tener más de 20 caracteres",
              },
            })}
          />
          <label htmlFor="nombre">Nombre completo</label>
        </div>
        <div className={errors_display}>
          {errors.nombre && <span>{errors.nombre.message}</span>}
        </div>

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

        {/* Confirm password */}
        <div className={input_container}>
          <input
            type="password"
            label="Confirmar contraseña"
            name="confirm_password"
            {...register("confirm_password", {
              required: {
                value: true,
                message: "Confirmar contraseña es requerido",
              },
              validate: (value) =>
                value === watch("password") || "Las contraseñas no coinciden",
            })}
          />
          <label htmlFor="confirm_contraseña">Confirmar contraseña</label>
        </div>
        <div className={errors_display}>
          {errors.confirm_password && (
            <span>{errors.confirm_password.message}</span>
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
            {/* dirección */}
            <div className={input_container}>
              <input
                type="text"
                label="direccion"
                name="direccion"
                {...register("direccion", {
                  required: {
                    value: true,
                    message: "La dirección es requerida",
                  },
                })}
              />
              <label htmlFor="direccion">Dirección</label>
            </div>
            <div className={errors_display}>
              {errors.direccion && <span>{errors.direccion.message}</span>}
            </div>

            {/* ciudad */}
            <div className={input_container}>
              <input
                type="text"
                label="ciudad"
                name="ciudad"
                {...register("ciudad", {
                  required: {
                    value: true,
                    message: "La ciudad es requerida",
                  },
                })}
              />
              <label htmlFor="ciudad">Ciudad</label>
            </div>
            <div className={errors_display}>
              {errors.ciudad && <span>{errors.ciudad.message}</span>}
            </div>

            <div className={addedInputs}>
              <div className={inputs_errors}>
                {/* codigo postal */}
                <div className={input_container}>
                  <input
                    type="number"
                    label="postal"
                    name="postal"
                    {...register("postal_code", {
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
                <div className={errors_display}>
                  {errors.postal_code && (
                    <span>{errors.postal_code.message}</span>
                  )}
                </div>
              </div>
              <div className={inputs_errors}>
                {/* pais */}
                <div className={input_container}>
                  <input
                    type="text"
                    label="pais"
                    name="pais"
                    {...register("pais", {
                      required: {
                        value: true,
                        message: "El pais es requerido",
                      },
                    })}
                  />
                  <label htmlFor="pais">Pais</label>
                </div>
                <div className={errors_display}>
                  {errors.postal_code && (
                    <span>{errors.postal_code.message}</span>
                  )}
                </div>
              </div>
            </div>
          </>
        )}

        <button type="submit" width="large">
          Enviar
        </button>
      </form>
      <div className={register_container}>
        <p>¿Ya tienes cuenta?</p>
        <Link to="/login">Inicia sesión</Link>
      </div>
    </div>
  );
}
