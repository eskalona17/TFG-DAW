import NavItem from "../navitem/Navitem"
import Styles from "./navbar.module.css"

const Navbar = () => {
  return (
    <ul className={Styles.navbar}>
      <NavItem label="Principal" />
      <NavItem label="Explora" />
      <NavItem label="Mensajes" />
      <NavItem label="Editar perfil" />
      <NavItem label="Configuración" />
    </ul>
  )
}

export default Navbar