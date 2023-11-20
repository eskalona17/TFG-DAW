import Styles from "./footer.module.css";

const Footer = () => {
  const { footer, list, collaborators, rights } = Styles;
  return (
    <footer className={footer}>
      <div className={list}>
        <ul className={collaborators}>
          <li>Fernando Escalona Alonso</li>
          <li>Ignacio Menéndez López</li>
          <li>Laura Tortosa Gil de Pareja</li>
        </ul>
        <ul className={rights}>
          <li>InstaPet © 2023 - All rights reserved</li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
