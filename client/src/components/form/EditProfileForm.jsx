import { useState } from "react";
import { useForm } from "react-hook-form";
import Styles from "./formEditProfile.module.css"; 
import Button from "../button/Button";
import { VscDeviceCamera } from "react-icons/vsc";
import url_image from "../../assets/img/media-1234.png";


const {
  form,
  userImage,
  inputContainer,
  label,
  input,
  errors_display,
  button,
  selectorContainer,
  perfilButton,
  bottomButtonContainer,
  imageContainer,
  inputConfirmContainer,
  editButton,
} = Styles;

export default function Formulario() {
  const {
    trigger,
    watch,
    register,
    formState: { errors },
    
  } = useForm();

  const [mostrarConfirmarPassword, setMostrarConfirmarPassword] = useState(false);
  const [perfil, setPerfil] = useState("personal");

  const handleGuardar = async () => {
    
    const isValid = await trigger();

    if (isValid) {
      
      console.log("Datos válidos, puedes proceder con la acción de guardar");
    } else {
      console.log("Datos inválidos, no puedes proceder con la acción de guardar");
    }
  };
  const handleEditarImagen = () => {
  };


  const handleCambiarPassword = () => {
   
      setMostrarConfirmarPassword(true);
    
  };

  const handleCambiarPerfil = (selectedPerfil) => {
    setPerfil(selectedPerfil);
  };
 

  return (
    <div className={form}>
      <div className={imageContainer}>
        <img src={url_image} alt="User" className={userImage} />
        <div className={editButton} onClick={handleEditarImagen}>
          <VscDeviceCamera style={{ fontSize: '24px' }} />
        </div>
      </div>
      <div className={errors.name ? errors_display : ""}>
          {errors.name && <span>{errors.name.message}</span>}
      </div>
      <div className={inputContainer}>
        <input
          type="text"
          name="Nombre"
          className={input}
          {...register("name",{
              required:{
                value:true,
                message:"El nombre es requerido"
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
      </div>
      <div className={errors.username ? errors_display : ""}>
          {errors.username && <span>{errors.username.message}</span>}
      </div>
      <div className={inputContainer}>
        <label className={label}>@</label>
        <input
          type="text"
          name="Usuario"
          className={input}
          {...register("username",{
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
      </div>
      <div className={errors_display}>
        {errors.email && <span>{errors.email.message}</span>}
      </div>

      <div className={inputContainer}>
        <input
          type="email"
          name="email"
          className={input}
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
      </div>
     
      <div className={errors.password ? errors_display : ""}>
        {errors.password && <span>{errors.password.message}</span>}
      </div>
      <div className={inputContainer}>
        <input
          type="password"
          name="password"
          onClick={handleCambiarPassword}
          className={input}
          placeholder="Cambiar Contraseña"
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
      </div>
        {mostrarConfirmarPassword && (
          <>
            <div className={errors.confirmPassword ? errors_display : ""}>
              {errors.confirmPassword && (
                <span>{errors.confirmPassword.message}</span>
              )}
            </div>
            <div className={inputConfirmContainer}>
              <input
                type="password"
                name="confirma password"
                className={input}
                placeholder="Confirmar Contraseña"
                {...register("confirmPassword", {
                  required: {
                    value: true,
                    message: "Confirmar contraseña es requerido",
                  },
                  validate: (value) =>
                    value === watch("password") || "Las contraseñas no coinciden",
                })}
              />
            </div>
            
          </>
        )}
   
      <div className={inputContainer}>
        <div className={selectorContainer}>
          <label className={label}>Perfil:</label>
          <div 
            className={`${perfilButton} ${perfil === "personal" ? Styles.active : ""}`}
            onClick={() => handleCambiarPerfil("personal")}
            
          >
            Personal
          </div>
          <div
            className={`${perfilButton} ${perfil === "profesional" ? Styles.active : ""}`}
            onClick={() => handleCambiarPerfil("profesional")}
            
          >
            Profesional
          </div>
        </div>
      </div>
      {perfil ==="profesional" && (
        <>
        <div className={errors.direccion ? errors_display : ""}>
          {errors.direccion && <span>{errors.direccion.message}</span>}
        </div>
        <div className={inputContainer}>
          <input
            type="text"
            name="direccion"
            className={input}
            placeholder="Dirección"
            {...register("address", {
              required: {
                value: true,
                message: "La dirección es requerida",
              },
            })}
          />
        </div>
        
        <div className={errors_display}>
          {errors.ciudad && <span>{errors.ciudad.message}</span>}
        </div>
        <div className={inputContainer}>
          <input
            type="text"
            name="ciudad"
            className={input}
            placeholder="Ciudad"
            {...register("city", {
              required: {
                value: true,
                message: "La ciudad es requerida",
              },
            })}
          />
        </div>
            
        <div className={errors.postal_code ? errors_display : ""}>
          {errors.postal_code && (
            <span>{errors.postal_code.message}</span>
          )}
        </div>
        <div className={errors.postal_code ? errors_display : ""}>
          {errors.postal_code && (
            <span>{errors.postal_code.message}</span>
          )}
        </div>
        <div className={inputContainer}>
          <input
            type="text"
            name="codigo postal"
            className={input}
            placeholder="Código Postal"
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
           <input
            type="text"
            name="pais"
            className={input}
            placeholder="País"
            {...register("country", {
              required: {
                value: true,
                message: "El pais es requerido",
              },
            })}
          />
        </div>
        
        </>
      )}
      <div className={bottomButtonContainer}>
        <Button
          onClick={handleGuardar}
          text="Guardar"
          className={button}
          type="submit"
          variant="primary"
        />
      </div>
    </div>
  );
}

