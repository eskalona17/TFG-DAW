import { useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useForm } from "react-hook-form";
import Styles from "./formEditProfile.module.css";
import Button from "../button/Button";
import { VscDeviceCamera } from "react-icons/vsc";
import axios from "axios";
import useUserImage from "./../../hooks/useUserImage";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

const {
  form,
  userImage,
  inputContainer,
  label,
  labelLabel,
  input,
  errors_display,
  noError,
  button,
  selectorContainer,
  tooltip,
  perfilButton,
  checkboxesContainer,
  checkboxOption,
  bottomButtonContainer,
  imageContainer,
  inputConfirmContainer,
  editButton,
} = Styles;

export default function Formulario () {
  const { currentUser, setCurrentUser } = useContext(AuthContext);
  const [mostrarConfirmarPassword, setMostrarConfirmarPassword] =
    useState(false);
  const [profile, setProfile] = useState(currentUser?.profile || "personal");
  const [imageData, setImageData] = useState({
    selectedImage: null,
    imagePreview: null,
  });
  const [selectedLabels, setSelectedLabels] = useState(currentUser?.labels);
  const { selectedImage } = imageData;
  const { userImage: profileImage } = useUserImage(currentUser);

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
      street: currentUser?.address?.street,
      city: currentUser?.address?.city,
      zipCode: currentUser?.address?.zipCode,
      country: currentUser?.address?.country,
      labels: currentUser?.labels,
    },
    mode: "onChange"
  });

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
        labels: selectedLabels
      };

      if (data.street || data.city || data.zipCode || data.country) {
        commonData.address = {
          street: data.street,
          city: data.city,
          zipCode: Number(data.zipCode),
          country: data.country,
        };
      }

      let response = null;
      if (selectedImage) {
        const formDataWithImage = new FormData();
        Object.entries(data).forEach(([key, value]) =>
          formDataWithImage.append(key, value)
        );
        formDataWithImage.append("profilePic", selectedImage);
        formDataWithImage.append("followers", currentUser.followers);
        formDataWithImage.append("following", currentUser.following);

        response = await axios.patch(
          apiUrl + "/api/users/update/" + currentUser._id,
          formDataWithImage,
          {
            withCredentials: true,
          }
        );
      } else {
        response = await axios.patch(
          apiUrl + "/api/users/update/" + currentUser._id,
          {
            ...commonData,
            profile: profile,
            followers: currentUser.followers,
            following: currentUser.following,
          },
          {
            withCredentials: true,
          }
        );
      }

      if (response.status === 200) {
        toast.success('Usuario Actualizado', {
          position: 'top-center',
          autoClose: 3000,

        });
        const updatedUserData = response.data.user;
        await setCurrentUser(updatedUserData);
        reset();
      } else {
        console.error("Error al actualizrr usuario:", response.statusText);
        toast.error('Error al actualizar los datos', {
          position: 'top-center',
          autoClose: 3000,

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
          errorMessage = 'Error al actualizar';
        }

        console.error("Conflicto:", conflictError);
        toast.error(errorMessage, {
          position: 'top-center',
          autoClose: 3000,
        });
      } else {
        toast.error('Error al actualizar los datos', {
          position: 'top-center',
          autoClose: 3000,
        });
      }

      reset();
    }
  });

  const handleImageChange = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = (e) => {
      const file = e.target.files[0];

      setImageData({
        selectedImage: file,
        imagePreview: URL.createObjectURL(file), // Crear la URL de la vista previa
      });
    };

    input.click();
  };

  const handleCambiarPassword = () => {
    setMostrarConfirmarPassword(true);
  };

  const handleCambiarprofile = (selectedprofile) => {
    setProfile(selectedprofile);
  };

  const handleCheckboxChange = (animal) => {
    setSelectedLabels((prevSelected) => {
      const isSelected = prevSelected.includes(animal);

      const updatedSelectedLabels = isSelected
        ? prevSelected.filter((selected) => selected !== animal)
        : [...prevSelected, animal];

      return updatedSelectedLabels;
    });
  };

  return (
    <form onSubmit={onSubmit} className={form}>
      <div className={imageContainer}>
        <img
          src={
            selectedImage ? URL.createObjectURL(selectedImage) : profileImage
          }
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
      <div className={errors.name ? errors_display : noError}>
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
              value: 3,
              message: "El usuario tiene que tener al menos tres caracteres",
            },
            maxLength: {
              value: 20,
              message: "El usuario no puede tener más de 20 caracteres",
            },
          })}
          defaultValue={currentUser ? currentUser.username : ""}
        />
      </div>

      {errors.username && <span className={errors.username ? errors_display : noError}>{errors.username.message}</span>}

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

      <div className={errors.email ? errors_display : noError}>
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
                  message:
                    "La nueva contraseña debe tener al menos 6 caracteres",
                },
                maxLength: {
                  value: 10,
                  message: "La contraseña no puede tener más de 10 caracteres",
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
                  value === watch("newPassword") ||
                  "Las contraseñas no coinciden",
              })}
            />
          </div>
          <div className={errors.confirmPassword ? errors_display : noError}>
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
            className={`${perfilButton} ${profile === "personal" ? Styles.active : ""
              }`}
            style={{ borderRadius: "0px" }}
            onClick={() => handleCambiarprofile("personal")}
          >
            Personal
          </div>
          <div
            className={`${perfilButton} ${profile === "profesional" ? Styles.active : ""
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
              {...register("street", {
                required: {
                  value: true,
                  message: "La dirección es requerida",
                },
              })}
              defaultValue={currentUser ? currentUser.address?.street : ""}
            />
          </div>
          <div className={errors.address ? errors_display : noError}>
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
                minLength: {
                  value: 3,
                  message: "La ciudad debe tener al menos 3 caracteres",
                },
                maxLength: {
                  value: 50,
                  message: "La ciudad no puede tener más de 50 caracteres",
                },
              })}
              defaultValue={currentUser ? currentUser.address?.city : ""}
            />
          </div>
          <div className={errors.city ? errors_display : noError}>
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
              defaultValue={currentUser ? currentUser.address?.zipCode : ""}
            />
          </div>
          <div className={errors.zipCode ? errors_display : noError}>
            {errors.zipCode && <span>{errors.zipCode.message}</span>}
          </div>

          {/* country */}
          <div className={inputContainer}>
            <input
              readOnly
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
              defaultValue={currentUser ? currentUser.address?.country : "España"}
            />
          </div>
          <div className={errors.country ? errors_display : noError}>
            {errors.country && <span>{errors.country.message}</span>}
          </div>
        </>
      )}

      {/* labels */}
      <div className={inputContainer}>
        <div className={checkboxesContainer}>
          <label className={labelLabel} style={{ borderRadius: "6px" }}>Etiquetas:
            <span className={tooltip}>?</span>
          </label>

          <div className={checkboxOption}>
            <input
              type="checkbox"
              id="gatos"
              {...register("labels")}
              value="gatos"
              defaultChecked={currentUser?.labels?.includes("gatos")}
              onChange={() => handleCheckboxChange("gatos")}
            />
            <label htmlFor="gatos">Gatos</label>
          </div>
          <div className={checkboxOption}>
            <input
              type="checkbox"
              id="perros"
              {...register("labels")}
              value="perros"
              defaultChecked={currentUser?.labels?.includes("perros")}
              onChange={() => handleCheckboxChange("perros")}
            />
            <label htmlFor="perros">Perros</label>
          </div>
          <div className={checkboxOption}>
            <input
              type="checkbox"
              id="roedores"
              {...register("labels")}
              value="roedores"
              defaultChecked={currentUser?.labels?.includes("roedores")}
              onChange={() => handleCheckboxChange("roedores")}
            />
            <label htmlFor="roedores">Roedores</label>
          </div>
          <div className={checkboxOption}>
            <input
              type="checkbox"
              id="reptiles"
              {...register("labels")}
              value="reptiles"
              defaultChecked={currentUser?.labels?.includes("reptiles")}
              onChange={() => handleCheckboxChange("reptiles")}
            />
            <label htmlFor="reptiles">Reptiles</label>
          </div>
        </div>
      </div>
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
