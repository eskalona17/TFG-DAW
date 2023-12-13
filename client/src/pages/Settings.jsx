import Button from "../components/button/Button";
import Styles from "./pages.module.css";

const Settings = () => {
  const { settings_container, settings_info } = Styles;

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
        <Button text="Cerrar sesión" variant="primary"/>
      </div>
      <div className={settings_container}>
        <div className={settings_info}>
          <p>
            <strong>Eliminar perfil</strong>
          </p>
          <span>¡Cuidado! Esta opción eliminará tu cuenta para siempre</span>
        </div>
        <Button text="Eliminar perfil" variant="delete"/>
      </div>
    </main>
  );
};

export default Settings;
