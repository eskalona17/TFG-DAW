import { useState } from "react";
import Styles from "./formEditProfile.module.css"; 
import Button from "../button/Button";
import url_image from "../../assets/img/media-1234.png";

const Formulario = () => {
  const [nombre, setNombre] = useState("");
  const [usuario, setUsuario] = useState("");
  const [email, setEmail] = useState("");
  const [confirmarEmail, setConfirmarEmail] = useState("");
  const [mostrarConfirmarEmail, setMostrarConfirmarEmail] = useState(false);
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
  const handleGuardarNombre = () => {
   
  };

  const handleGuardarUsuario = () => {
   
  };

  const handleCambiarEmail = () => {
    if(email !== ""){
      setMostrarConfirmarEmail(true);
    }
  };

  const handleCambiarPassword = () => {
    if(password !==""){
      setMostrarConfirmarPassword(true);
    }
  };

  const handleCambiarPerfil = (selectedPerfil) => {
    setPerfil(selectedPerfil);

    setDireccion("");
    setCiudad("");
    setCodigoPostal("");
    setPais("");
  };
  const handleGuardarCambiosPassword = () => {

  }; 
  
  const handleGuardarCambiosEmail = () => {

  };
  const handleGuardarProfesional = () => {

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
          Editar
        </div>
      </div>
      <div className={inputContainer}>
        <input
          type="text"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          className={input}
        />
        <Button
          onClick={handleGuardarNombre}
          text="Guardar"
          className={button}
          type="submit"
          variant="primary"
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
        <Button
          onClick={handleGuardarUsuario}
          text="Guardar"
          className={button}
          type="submit"
          variant="primary"
        />
      </div>
      <div className={inputContainer}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={input}
        />
        {!mostrarConfirmarEmail && (
          <Button
            onClick={handleCambiarEmail}
            text="Cambiar"
            className={button}
            type="submit"
            variant="primary"
          />
        )}
      </div>
        {mostrarConfirmarEmail && (
          <>
            <div className={inputConfirmContainer}>
              <input
                type="email"
                value={confirmarEmail}
                onChange={(e) => setConfirmarEmail(e.target.value)}
                className={input}
                placeholder="Confirmar Email"
              />
              <Button
                onClick={handleGuardarCambiosEmail}
                text="Guardar"
                className={button}
                type="submit"
                variant="primary"
              />
            </div>
          </>
        )}
        
      

      <div className={inputContainer}>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={input}
        />
        {!mostrarConfirmarPassword && (
          <Button
            onClick={handleCambiarPassword}
            text="Cambiar"
            className={button}
            type="submit"
            variant="primary"
          />
        )}
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
              <Button
                onClick={handleGuardarCambiosPassword}
                text="Guardar"
                className={button}
                type="submit"
                variant="primary"
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
        <div className={bottomButtonContainer}>
            <Button
              onClick={handleGuardarProfesional}
              text="Guardar"
              className={button}
              type="submit"
              variant="primary"
            />
          </div>
        </>
      )}

    </div>
  );
};

export default Formulario;