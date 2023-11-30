import { useState} from "react";
import { useForm } from "react-hook-form";
import Styles from "./formEditProfile.module.css"; 
import Button from "../button/Button";
import { VscDeviceCamera } from "react-icons/vsc";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import url_image from "../../assets/img/media-1234.png";


const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;



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
  const navigate = useNavigate();
  const localStoreData =localStorage.getItem('user');
  const userData =  localStoreData ? JSON.parse(localStoreData) : null;
  
  const {
    handleSubmit,
    watch,
    register,
    formState: { errors },
    reset,
    
  } = useForm({
    defaultValues:{
      name: userData?.name,
      username: userData?.username,
      email:userData?.email,
      profile: userData?.profile,
      address: userData?.address,
      city: userData?.city,
      zipCode: userData?.zipCode,
      country: userData?.country,

    }
  });

 

  
  const [mostrarConfirmarPassword, setMostrarConfirmarPassword] = useState(false);
  const [profile, setProfile] = useState("personal");
  const [selectedImage, setSelectedImage] = useState(null);
  

 
  const onSubmit = handleSubmit(async (data) => {
    try {
      
      console.log(data);
      console.log('ID de userData:', userData._id);

      const commonData = {
        name: data.name,
        username: data.username,
        email: data.email,
        password: data.password,
        confirmPassword: data.confirmPassword,
        profile: data.profile,
        address: data.address,
        city: data.city,
        zipCode: data.zipCode,
        country: data.country,
      };

      let response = null;
      if(selectedImage){

        const formDataWithImage = new FormData();
        Object.entries(commonData).forEach(([key, value]) => formDataWithImage.append(key, value));
        formDataWithImage.append('profilePic', selectedImage);

        
        response = await axios.patch(apiUrl + '/api/users/update/'  + userData._id, formDataWithImage, {
          withCredentials: true,
        });
      }else{
         response = await axios.patch(apiUrl + "/api/users/update/" + userData._id, {
          ...commonData,
          profile: profile,
        },{
          withCredentials:true,
        });
      }
     

      if (response.status === 200) {
        console.log("Usuario actualizado exitosamente");
        alert("Usuario actualizado exitosamente");
        const updatedUserData = {
          ...userData,
          name: data.name, 
          username: data.username,
          email: data.email,
          addres: data.addres,
          city: data.city,
          zipCode: data.zipCode,
          country: data.country,
        };
      
        localStorage.setItem('user', JSON.stringify(updatedUserData));
        navigate("/");
        reset();
      } else {
        console.error("Error al actualizrr usuario:", response.statusText);
        alert("Error al actulizar usuario");
      }
    } catch (error) {
      console.error("Error:", error.message);
      alert("Error al actualizar  usuario");
    }
    reset();
  });


  const handleImageChange = (e) => {
    const files = e.target.files;
  
    if (files && files.length > 0) {
      const file = files[0];
      setSelectedImage(file);
    }
  };
  

  const handleCambiarPassword = () => {
   
      setMostrarConfirmarPassword(true);
    
  };

  const handleCambiarprofile = (selectedprofile) => {
    setProfile(selectedprofile);
  };
 

  return (
    <div className={form}>
      <form onSubmit={onSubmit}>
        <div className={imageContainer}>
          <img src={url_image} alt="User" className={userImage} />
          <label className={editButton} htmlFor="profileImageInput">
            <VscDeviceCamera style={{ fontSize: '24px' }} />
          </label>
        </div>
        <input
          type="file"
          id="profileImageInput"
          accept="image/*"
          onChange={handleImageChange}
          style={{ display: 'none' }} 
        />
        <div className={errors.name ? errors_display : ""}>
            {errors.name && <span>{errors.name.message}</span>}
        </div>
        <div className={inputContainer}>
          <input
            type="text"
            name="Nombre"
            className={input}
            
            {...register("name",{
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
              className={`${perfilButton} ${profile === "personal" ? Styles.active : ""}`}
              onClick={() => handleCambiarprofile("personal")}
              
            >
              Personal
            </div>
            <div
              className={`${perfilButton} ${profile === "profesional" ? Styles.active : ""}`}
              onClick={() => handleCambiarprofile("profesional")}
              
            >
              Profesional
            </div>
          </div>
        </div>
        {profile ==="profesional" && (
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
            
            text="Guardar"
            className={button}
            type="submit"
            variant="primary"
          />
        </div>
      </form>
    </div>
  );
}

