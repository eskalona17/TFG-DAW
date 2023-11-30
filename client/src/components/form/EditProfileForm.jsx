import { useState, useEffect } from "react";
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
  const {
    handleSubmit,
    watch,
    register,
    formState: { errors },
    reset,
    setValue,
  } = useForm();

  const navigate = useNavigate();

  const [profilePic, setProfilePic] = useState(null); // New state to track the selected profile picture

  const [imagePreview, setImagePreview] = useState(null);
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    username: "",
    email: "",
    address: "",
    city: "",
    zipCode: "",
    country: "",
    profilePic: null,
  });

  const localStoreData = localStorage.getItem("user");
  const userData = JSON.parse(localStoreData);
  const [mostrarConfirmarPassword, setMostrarConfirmarPassword] =
    useState(false);
  const [profile, setProfile] = useState("personal");

  useEffect(() => {
    if (userData && userData.name !== formData.name) {
      setFormData({
        id: userData._id,
        name: userData.name,
        username: userData.username,
        email: userData.email,
        address: userData.address || "",
        city: userData.city || "",
        zipCode: userData.zipCode || "",
        country: userData.country || "",
        profilePic: profilePic || userData.profilePic || null,
      });
      setValue("userId", userData._id);
      setValue("name", userData.name);
      setValue("username", userData.username);
      setValue("email", userData.email);
      setValue("address", userData.address);
      setValue("city", userData.city);
      setValue("zipCode", userData.zipCode);
      setValue("country", userData.country);
    }
  }, [userData, setValue, formData.name]);

  const onSubmit = handleSubmit(async (data) => {
    try {
      const formData = new FormData();
      formData.append("image", data.profilePic[0]); // Assuming your file input is named "profilePic"

      // Additional data
      formData.append("name", data.name);
      formData.append("username", data.username);
      formData.append("email", data.email);
      formData.append("password", data.password);
      formData.append("confirmPassword", data.confirmPassword);
      formData.append("profile", profile);
      formData.append("address", data.address);
      formData.append("city", data.city);
      formData.append("zipCode", data.zipCode);
      formData.append("country", data.country);

      const response = await axios.patch(
        `${apiUrl}:1234/api/users/update/${userData._id}`,
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200) {
        console.log("Usuario actualizado exitosamente");
        alert("Usuario actualizado exitosamente");
        navigate("/");
        reset();
      } else {
        console.error("Error al actualizar usuario:", response.statusText);
        alert("Error al registrar usuario");
      }
    } catch (error) {
      console.error("Error:", error.message);
      alert("Error al registrar usuario");
    }
    reset();
  });

  const handleEditarImagen = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = (e) => {
      const file = e.target.files[0];
      setValue("profilePic", file); // Set the selected file to the "profilePic" field

      // Use FileReader to preview the image
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      if (file) {
        reader.readAsDataURL(file);
      } else {
        setImagePreview(null);
      }
    };
    input.click();
  };

  const handleCambiarPassword = () => {
    setMostrarConfirmarPassword(true);
  };

  const handleCambiarprofile = (selectedprofile) => {
    setProfile(selectedprofile);
  };

  return (
    <form onSubmit={onSubmit} className={form}>
      <div className={imageContainer}>
        <img
          src={
            imagePreview ||
            (formData.profilePic
              ? URL.createObjectURL(formData.profilePic)
              : url_image)
          }
          alt="User"
          className={userImage}
        />
        <div className={editButton} onClick={handleEditarImagen}>
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
          defaultValue={userData ? userData.name : ""}
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
          defaultValue={userData ? userData.username : ""}
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
          defaultValue={userData ? userData.email : ""}
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
              defaultValue={userData ? userData.address : ""}
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
              defaultValue={userData ? userData.city : ""}
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
              defaultValue={userData ? userData.zipCode : ""}
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
              defaultValue={userData ? userData.country : ""}
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
  );
}
