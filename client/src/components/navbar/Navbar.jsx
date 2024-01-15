import Styles from "@/components/navbar/navbar.module.css";
import { HiOutlineEnvelope } from "react-icons/hi2";
import NavItem from "@/components/navItem/Navitem";
import { HiMiniSquares2X2 } from "react-icons/hi2";
import { CgProfile } from "react-icons/cg";
import { TfiMenu } from "react-icons/tfi";
import { TbWorld } from "react-icons/tb";
import { GoGear } from "react-icons/go";
import { useState } from "react";

const Navbar = () => {
  const { navbar, icon, overlay } = Styles;
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const orange_color = "#ffa07a";

  const handleButtonClick = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <button className="floatingButton" onClick={handleButtonClick}>
        <TfiMenu className={icon} />
        {isMenuOpen && (
          <>
            <div className={overlay} onClick={handleButtonClick} />
            <ul className={`${isMenuOpen ? 'show' : ''}`}>
              <NavItem
                label="Principal"
                path="/"
                icon={<HiMiniSquares2X2 color={orange_color} />}
              />
              <NavItem
                label="Explora"
                path="/explora"
                icon={<TbWorld color={orange_color} />}
              />
              <NavItem
                label="Mensajes"
                path="/mensajes"
                icon={<HiOutlineEnvelope color={orange_color} />}
                notify={true}
              />
              <NavItem
                label="Editar perfil"
                path="/editar-perfil"
                icon={<CgProfile color={orange_color} />}
              />
              <NavItem
                label="Configuración"
                path="/ajustes"
                icon={<GoGear color={orange_color} />}
              />
            </ul>
          </>
        )}
      </button>
      <ul className={navbar}>
        <NavItem
          label="Principal"
          path="/"
          icon={<HiMiniSquares2X2 color={orange_color} />}
        />
        <NavItem
          label="Explora"
          path="/explora"
          icon={<TbWorld color={orange_color} />}
        />
        <NavItem
          label="Mensajes"
          path="/mensajes"
          icon={<HiOutlineEnvelope color={orange_color} />}
          notify={true}
        />
        <NavItem
          label="Editar perfil"
          path="/editar-perfil"
          icon={<CgProfile color={orange_color} />}
        />
        <NavItem
          label="Configuración"
          path="/ajustes"
          icon={<GoGear color={orange_color} />}
        />
      </ul>
    </>
  );
};

export default Navbar;
