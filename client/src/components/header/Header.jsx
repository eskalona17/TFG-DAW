import Styles from "./header.module.css"

const Header = () => {
  return (
    <header className={Styles.header}>
      <div className={Styles.title_container}>
        <h1 className={Styles.title}>M</h1>
      </div>
      <div className={Styles.search_container}>
        <form className={Styles.search_form}>
          <input type="text" placeholder="Buscar..." className={Styles.search} />
          <button className={Styles.search_button}>i</button>
        </form>
      </div>
      <div className={Styles.notifications_container}>
        <span className={Styles.notifications}>i</span>
      </div>
    </header>
  )
}

export default Header