import Styles from './button.module.css'

/* 

Para usar el componente debe indicarse el texto que se quiere mostrar [text] , la accion [onClick] y el tipo de boton [variant]

  <Button text="Seguir" onClick={() => console.log('click')} variant="primary" />

*/

const Button = ({ text, onClick, variant }) => {
  const buttonClass = `${Styles.button} ${Styles[variant]}`

  return (
    <button className={buttonClass} onClick={onClick}>
      {text}
    </button>
  )
}

export default Button