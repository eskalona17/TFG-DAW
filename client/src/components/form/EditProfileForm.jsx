import { useState, useContext} from "react"
import { AuthContext } from "../../context/authContext"
import { useForm } from "react-hook-form"
import Styles from "./formEditProfile.module.css"
import Button from "../button/Button"
import { VscDeviceCamera } from "react-icons/vsc"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import useUserImage from './../../hooks/useUserImage'

const apiUrl = import.meta.env.VITE_REACT_APP_API_URL

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
} = Styles

export default function Formulario() {
  const navigate = useNavigate()
  const { currentUser, setCurrentUser } = useContext(AuthContext)
  const [mostrarConfirmarPassword, setMostrarConfirmarPassword] = useState(false)
  const [profile, setProfile] = useState(currentUser.profile || "personal")
  const [imageData, setImageData] = useState({
    selectedImage: null,
    imagePreview: null,
  })
  
  const { selectedImage } = imageData
  const {userImage: profileImage} = useUserImage(currentUser)
  
  const {
    handleSubmit,
    watch,
    register,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      name: currentUser?.name,
      username: currentUser?.username,
      email: currentUser?.email,
      profile: currentUser?.profile,
      address: currentUser?.address,
      city: currentUser?.city,
      zipCode: currentUser?.zipCode,
      country: currentUser?.country,
    }
  })

  const onSubmit = handleSubmit(async (data) => {
    try {
      const commonData = {
        name: data.name,
        username: data.username,
        email: data.email,
        password: data.password,
        newPassword: data.newPassword,
        confirmNewPassword: data.confirmNewPassword,
        profile: data.profile,
        address: data.address,
        city: data.city,
        zipCode: data.zipCode,
        country: data.country,
      }

      let response = null
      if(selectedImage){

        const formDataWithImage = new FormData()
        Object.entries(commonData).forEach(([key, value]) => formDataWithImage.append(key, value))
        formDataWithImage.append('profilePic', selectedImage)
        formDataWithImage.append('followers', currentUser.followers)
        formDataWithImage.append('following', currentUser.following)
        
        response = await axios.patch(apiUrl + '/api/users/update/'  + currentUser._id, formDataWithImage, {
          withCredentials: true,
        })
      }else{
         response = await axios.patch(apiUrl + "/api/users/update/" + currentUser._id, {
          ...commonData,
          profile: profile,
          followers: currentUser.followers,
          following: currentUser.following,
        },{
          withCredentials:true,
        })
      }
     

      if (response.status === 200) {
        console.log("Usuario actualizado exitosamente")
        alert("Usuario actualizado exitosamente")
        const updatedUserData = response.data.user
        console.log("Respuesta de la API:", response.data.user)
        await setCurrentUser(updatedUserData) 
        navigate("/")
        reset()
      } else {
        console.error("Error al actualizrr usuario:", response.statusText)
        alert("Error al actulizar usuario")
      }
    } catch (error) {
      console.error("Error:", error.message)
      alert("Error al actualizar el usuario")
    }
    reset()
  })

  const handleImageChange = () => {
    const input = document.createElement("input")
    input.type = "file"
    input.accept = "image/*"
    input.onchange = (e) => {
      const file = e.target.files[0]
  
      setImageData({
        selectedImage: file,
        imagePreview: URL.createObjectURL(file), // Crear la URL de la vista previa
      })
    }
  
    input.click()
  }

  

  const handleCambiarPassword = () => {
    setMostrarConfirmarPassword(true)
  }

  const handleCambiarprofile = (selectedprofile) => {
    setProfile(selectedprofile)
  }

  return (
    <form onSubmit={onSubmit} className={form}>
      <div className={imageContainer}>
        <img
          src= {selectedImage ? URL.createObjectURL(selectedImage) : profileImage}
          alt="User"
          className={userImage}
        />
        <div className={editButton} onClick={handleImageChange}>
          <VscDeviceCamera style={{ fontSize: "24px" }} />
        </div>
      </div>

      {/* name */}
      <div className={inputContainer}>
        <input
          type="text"
          name="Nombre"
          className={input}
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
          defaultValue={currentUser ? currentUser.name : ""}
        />
      </div>
      <div className={errors.name ? errors_display : ""}>
        {errors.name && <span>{errors.name.message}</span>}
      </div>

      {/* username */}
      <div className={inputContainer}>
        <label className={label}>@</label>
        <input
          type="text"
          name="Usuario"
          className={input}
          style={{ borderLeft: 0, borderRadius: "0px 4px 4px 0px" }}
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
          defaultValue={currentUser ? currentUser.username : ""}
        />
      </div>
      <div className={errors.username ? errors_display : ""}>
        {errors.username && <span>{errors.username.message}</span>}
      </div>

      {/* email */}
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
          defaultValue={currentUser ? currentUser.email : ""}
        />
      </div>

      <div className={errors.email ? errors_display : ""}>
        {errors.email && <span>{errors.email.message}</span>}
      </div>

      {/* password */}
      <div className={inputContainer}>
        <input
          type="password"
          name="password"
          onClick={handleCambiarPassword}
          className={input}
          placeholder="Contraseña Actual"
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

        {/* new password */}
          <div className={inputContainer}>
            <input
              type="password"
              name="newPassword"
              className={input}
              placeholder="Nueva Contraseña"
              {...register("newPassword", {
                minLength: {
                  value: 6,
                  message: "La nueva contraseña debe tener al menos 6 caracteres",
                },
              })}
            />
          </div>

          {/* confirm new password */}
          <div className={inputConfirmContainer}>
            <input
              type="password"
              name="confirma password"
              className={input}
              placeholder="Confirmar Contraseña"
              {...register("confirmNewPassword", {
                required: {
                  value: true,
                  message: "Confirmar contraseña es requerido",
                },
                validate: (value) =>
                  value === watch("newPassword") || "Las contraseñas no coinciden",
              })}
            />
          </div>
          <div className={errors.confirmPassword ? errors_display : ""}>
            {errors.confirmPassword && (
              <span>{errors.confirmPassword.message}</span>
            )}
          </div>
        </>
      )}

      {/* choose profesional or personal */}
      <div className={inputContainer}>
        <div className={selectorContainer}>
          <label className={label}>Perfil:</label>
          <div
            className={`${perfilButton} ${
              profile === "personal" ? Styles.active : ""
            }`}
            style={{ borderRadius: "0px" }}
            onClick={() => handleCambiarprofile("personal")}
          >
            Personal
          </div>
          <div
            className={`${perfilButton} ${
              profile === "profesional" ? Styles.active : ""
            }`}
            style={{ borderRadius: "0px 4px 4px 0px", borderLeft: 0 }}
            onClick={() => handleCambiarprofile("profesional")}
          >
            Profesional
          </div>
        </div>
      </div>
      {profile === "profesional" && (
        <>
          {/* address */}
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
              defaultValue={currentUser ? currentUser.address : ""}
            />
          </div>
          <div className={errors.address ? errors_display : ""}>
            {errors.address && <span>{errors.address.message}</span>}
          </div>

          {/* ciudad */}
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
              defaultValue={currentUser ? currentUser.city : ""}
            />
          </div>
          <div className={errors.city ? errors_display : ""}>
            {errors.city && <span>{errors.city.message}</span>}
          </div>

          <div className={inputContainer}>
            {/* postal code */}
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
              defaultValue={currentUser ? currentUser.zipCode : ""}
            />
          </div>
          <div className={errors.zipCode ? errors_display : ""}>
            {errors.zipCode && <span>{errors.zipCode.message}</span>}
          </div>

          {/* country */}
          <div className={inputContainer}>
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
              defaultValue={currentUser ? currentUser.country : ""}
            />
          </div>
          <div className={errors.country ? errors_display : ""}>
            {errors.country && <span>{errors.country.message}</span>}
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

  )
}
