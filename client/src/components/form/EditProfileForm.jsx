import { useState } from "react";
import Styles from "./formEditProfile.module.css"; 
import Button from "../button/Button";
import { VscDeviceCamera } from "react-icons/vsc";
import url_image from "../../assets/img/media-1234.png";

const Formulario = () => {
  const [nombre, setNombre] = useState("");
  const [usuario, setUsuario] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmarPassword, setConfirmarPassword] = useState("");
  const [mostrarConfirmarPassword, setMostrarConfirmarPassword] = useState(false);
  const [perfil, setPerfil] = useState("personal");
  const [direccion, setDireccion] = useState("");
  const [ciudad, setCiudad] = useState("");
  const [codigoPostal, setCodigoPostal] = useState("");
  const [pais, setPais] = useState("");

  const handleEditarImagen = () => {

  };


  const handleCambiarPassword = () => {
   
      setMostrarConfirmarPassword(true);
    
  };

  const handleCambiarPerfil = (selectedPerfil) => {
    setPerfil(selectedPerfil);

    setDireccion("");
    setCiudad("");
    setCodigoPostal("");
    setPais("");
  };
 
  
  const handleGuardar = () => {

  };
 

  const {
    form,
    userImage,
    inputContainer,
    label,
    input,
    button,
    selectorContainer,
    perfilButton,
    bottomButtonContainer,
    imageContainer,
    inputConfirmContainer,
    editButton,
  } = Styles;

  return (
    <div className={form}>
      <div className={imageContainer}>
        <img src={url_image} alt="User" className={userImage} />
        <div className={editButton} onClick={handleEditarImagen}>
          <VscDeviceCamera style={{ fontSize: '24px' }} />
        </div>
      </div>
      <div className={inputContainer}>
        <input
          type="text"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          className={input}
        />
      </div>
      <div className={inputContainer}>
        <label className={label}>@</label>
        <input
          type="text"
          value={usuario}
          onChange={(e) => setUsuario(e.target.value)}
          className={input}
        />
      </div>
      <div className={inputContainer}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={input}
        />
      </div>
        
      

      <div className={inputContainer}>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onClick={handleCambiarPassword}
          className={input}
          placeholder="Cambiar Contraseña"
        />
      </div>
        {mostrarConfirmarPassword && (
          <>
            <div className={inputConfirmContainer}>
              <input
                type="password"
                value={confirmarPassword}
                onChange={(e) => setConfirmarPassword(e.target.value)}
                className={input}
                placeholder="Confirmar Contraseña"
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
            //style={{ backgroundColor: perfil === "personal" ? "#ffa07a" : "transparent" }}
          >
            Personal
          </div>
          <div
            className={`${perfilButton} ${perfil === "profesional" ? Styles.active : ""}`}
            onClick={() => handleCambiarPerfil("profesional")}
            //style={{ backgroundColor: perfil === "profesional" ? "#ffa07a" : "transparent" }}
          >
            Profesional
          </div>
        </div>
      </div>
      {perfil ==="profesional" && (
        <>
        <div className={inputContainer}>
          <input
            type="text"
            value={direccion}
            onChange= {(e)=>setDireccion(e.target.value)}
            className={input}
            placeholder="Dirección"
          />
        </div>
        <div className={inputContainer}>
          <input
            type="text"
            value={ciudad}
            onChange= {(e)=>setCiudad(e.target.value)}
            className={input}
            placeholder="Ciudad"
          />
        </div>
        <div className={inputContainer}>
          <input
            type="text"
            value={codigoPostal}
            onChange= {(e)=>setCodigoPostal(e.target.value)}
            className={input}
            placeholder="Código Postal"
          />
           <input
            type="text"
            value={pais}
            onChange= {(e)=>setPais(e.target.value)}
            className={input}
            placeholder="País"
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
};

export default Formulario;