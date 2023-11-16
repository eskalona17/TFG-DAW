import Styles from './footer.module.css'

const Footer = () => {
  return (
    <footer className={Styles.footer}>
      <div>
        <p>Fernando Escalona Alonso </p>
        <p>Ignacio Menéndez López</p>
        <p>Laura Tortosa Gil de Pareja</p>
      </div>
      <div>
       <p>InstaPet © 2023 - All rights reserved</p>
      </div>
    </footer>
   
  )
}

export default Footer