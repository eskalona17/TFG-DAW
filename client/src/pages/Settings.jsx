import { useState, useContext } from "react";
import Button from "../components/button/Button";
import Styles from "./pages.module.css";
import { AuthContext } from "../context/authContext";
import { createPortal } from "react-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

const Settings = () => {
  const navigate = useNavigate();
  const { logout, currentUser } = useContext(AuthContext);

  const {
    settings_container,
    settings_info,
    modal,
    modal_buttons,
    toggle_icon,
  } = Styles;

  // show modal
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState(null);

  const ModalSession = ({ onClose }) => (
    <div className={modal}>
      <span>¿Estás seguro de que deseas cerrar la sesión?</span>
      <div className={modal_buttons}>
        <Button onClick={handleLogout} text="Aceptar" variant="secondary" />
        <Button onClick={onClose} text="Cerrar" variant="primary" />
      </div>
    </div>
  );

  const ModalProfile = ({ onClose }) => (
    <div className={modal}>
      <span>¿Estás seguro de que deseas eliminar el perfil?</span>
      <div className={modal_buttons}>
        <Button onClick={deteleUser} text="Aceptar" variant="secondary" />
        <Button onClick={onClose} text="Cerrar" variant="primary" />
      </div>
    </div>
  );

  const ToggleButton = ({ toggled}) => {
    const [isToggled, setIsToggled] = useState(toggled);

    const callback = () => {
      setIsToggled(!isToggled);
      onclick(!isToggled);
    };
    return (
      <label>
        <input type="checkbox" defaultChecked={isToggled} onClick={callback} />
        <span className={toggle_icon}></span>
      </label>
    );
  };

  const deteleUser = async () => {
    try {
      const response = await axios.delete(
        apiUrl + "/api/users/delete/" + currentUser._id,
        {
          withCredentials: true,
        }
      );
      // Verifica el estado de la respuesta y actualiza según sea necesario
      if (response.status === 200) {
        alert("Usuario eliminado exitosamente");
        navigate("/login");
      } else {
        console.error("Error al eliminar el usuario:", response.data.message);
        alert("Error al eliminar el usuario");
      }
    } catch (error) {
      console.error("Error:", error.message);
      alert("Error al eliminar el usuario");
    }
  };

  // when the user clicks on accept
  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  const handleOpenModal = (type) => {
    setShowModal(true);
    setModalType(type);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setModalType(null);
  };

  return (
    <main className="main">
      <h3>Configuración de la cuenta</h3>
      <div className={settings_container}>
        <div className={settings_info}>
          <p>
            <strong>Modo oscuro</strong>
          </p>
          <span>Activa el modo oscuro en toda la web</span>
        </div>
        {<ToggleButton />}
      </div>
      <div className={settings_container}>
        <div className={settings_info}>
          <p>
            <strong>Cerrar sesión</strong>
          </p>
          <span>Cierra la sesión en este dispositivo</span>
        </div>
        <Button
          text="Cerrar sesión"
          variant="primary"
          onClick={() => handleOpenModal("session")}
        />
      </div>
      <div className={settings_container}>
        <div className={settings_info}>
          <p>
            <strong>Eliminar perfil</strong>
          </p>
          <span>¡Cuidado! Esta opción eliminará tu cuenta para siempre</span>
        </div>
        <Button
          text="Eliminar perfil"
          variant="delete"
          onClick={() => handleOpenModal("profile")}
        />
      </div>
      {showModal &&
        createPortal(
          modalType === "session" ? (
            <ModalSession onClose={handleCloseModal} />
          ) : (
            <ModalProfile onClose={handleCloseModal} />
          ),
          document.body
        )}
    </main>
  );
};

export default Settings;
