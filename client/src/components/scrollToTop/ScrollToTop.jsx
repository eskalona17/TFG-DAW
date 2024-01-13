import React, { useState, useEffect } from "react";
import { IoIosArrowUp } from "react-icons/io";
import Styles from "./scrolltotop.module.css";

const ScrollToTop = () => {
  const [showScrollToTop, setShowScrollToTop] = useState(false);

  // Manejar el scroll y mostrar/ocultar el botón
  const handleScroll = () => {
    if (window.scrollY > 200) {
      setShowScrollToTop(true);
    } else {
      setShowScrollToTop(false);
    }
  };

  // Scroll hasta la parte superior
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Agregar un listener de scroll al montar el componente
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    // Limpiar el listener al desmontar el componente
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      {showScrollToTop && (
        <div className={Styles.scrollToTop} onClick={scrollToTop}>
          <IoIosArrowUp />
        </div>
      )}
    </>
  );
};

export default ScrollToTop;
