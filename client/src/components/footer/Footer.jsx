import Styles from "./footer.module.css";

const Footer = () => {
  const { footer, collaborators, rights } = Styles;
  return (
    <footer className={footer}>
      <ul className={collaborators}>
        <li>Fernando Escalona Alonso</li>
        <li>Ignacio Menéndez López</li>
        <li>Laura Tortosa Gil de Pareja</li>
      </ul>
      <p className={rights}>InstaPet © 2023 - Todos los derechos reservados</p>
    </footer>
  );
};

export default Footer;
