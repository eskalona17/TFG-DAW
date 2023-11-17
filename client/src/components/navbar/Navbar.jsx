import NavItem from "../navitem/Navitem"
import Styles from "./navbar.module.css"

const Navbar = () => {

  return (
    <ul className={Styles.navbar}>
      <NavItem label="Principal" path="/"/>
      <NavItem label="Explora" path="/explora" />
      <NavItem label="Mensajes" path="/mensajes" />
      <NavItem label="Editar perfil" path="/editar-perfil" />
      <NavItem label="Configuración" path="/ajustes" />
    </ul>
  )
}

export default Navbar