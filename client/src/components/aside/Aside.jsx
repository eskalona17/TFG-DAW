import Styles from './aside.module.css'

const Aside = () => {
  return (
    <aside className={Styles.aside}>
      <div className={Styles.user_container}>
        <img src="" alt="" className={Styles.user_img} />
        <div className={Styles.user_info}>
          <p className={Styles.user_name}>Nombre usuario</p>
          <p className={Styles.user_username}>@usuario</p>
        </div>
      </div>
      <div className={Styles.follow_container}>
        <span className={Styles.followers}>123 seguidores</span>
        <span className={Styles.followers}>54 seguidos</span>
      </div>
    </aside>
  )
}

export default Aside