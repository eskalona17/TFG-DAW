import { useState } from 'react';
import Styles from './button.module.css'

/* 

Para usar el componente debe indicarse el texto que se quiere mostrar [text] , la accion [onClick] y el tipo de boton [variant]

  <Button text="Seguir" onClick={() => console.log('click')} variant="primary" />

*/

const Button = ({ text, onClick, variant, disabled }) => {
  const [isLoading, setIsLoading] = useState(false);
  const buttonClass = `${Styles.button} ${Styles[variant]}`

  const handleClick = async () => {
    setIsLoading(true);
    if(typeof onClick ==='function'){
      await onClick();
    }
    setIsLoading(false);
  }

  return (
    <button className={buttonClass} onClick={handleClick} disabled={disabled || isLoading} >
      {text}
    </button>
  )
}

export default Button