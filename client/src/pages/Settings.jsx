import { useState, useContext } from "react";
import Button from "../components/button/Button";
import Styles from "./pages.module.css";
import { AuthContext } from "../context/authContext";
import { createPortal } from "react-dom";
import { useNavigate } from "react-router-dom";


const Settings = () => {
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);

  const { settings_container, settings_info, modal, modal_buttons } = Styles;

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
        <Button onClick={onClose} text="Aceptar" variant="secondary" />
        <Button onClick={onClose} text="Cerrar" variant="primary" />
      </div>
    </div>
  );

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
        <button></button>
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
