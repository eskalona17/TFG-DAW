import Styles from '@/bannerCookies.module.css'
import Button from '@/button/Button';
import { useEffect, useState } from 'react';

const BannerCookies = () => {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const acceptedCookies = localStorage.getItem('acceptedCookies');
    if (!acceptedCookies) {
      setShowBanner(true);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem('acceptedCookies', 'true');
    setShowBanner(false);
  };

  if (!showBanner) {
    return null;
  }
  return (
    <div className={Styles.banner}>
      <p className={Styles.text}>Este sitio web utiliza cookies técnicas y de preferencias para mejorar tu experiencia de navegación. Las cookies técnicas son necesarias para el funcionamiento básico del sitio, mientras que las cookies de preferencias nos permiten personalizar y optimizar tu experiencia en nuestro sitio. Al continuar utilizando nuestro sitio, aceptas el uso de estas cookies.</p>
      <Button text="Aceptar" onClick={acceptCookies} variant="cookies" />
    </div>
  )
}

export default BannerCookies