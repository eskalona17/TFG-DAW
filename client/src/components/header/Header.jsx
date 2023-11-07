import Styles from "./header.module.css"

const Header = () => {
  return (
    <header className={Styles.header}>
      <div className={Styles.title_container}>
        <h1 className={Styles.title}>Mascotas</h1>
      </div>
      <div className={Styles.search_container}>
        <form>
          <input type="text" placeholder="Buscar..." className={Styles.search} />
          <button className={Styles.search_button}>E</button>
        </form>
      </div>
    </header>
  )
}

export default Header