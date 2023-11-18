import Styles from './user.module.css'
import { useContext } from 'react'
import { AuthContext } from "../../context/AuthContext"


const User = () => {
  const { currentUser } = useContext(AuthContext)
  
  return (
    <aside className={Styles.user}>
      <div className={Styles.user_container}>
        <img src="/media-1234.png" alt="" className={Styles.user_img} />
        <div className={Styles.user_info}>
          <p className={Styles.user_name}>{currentUser ? (currentUser.name) : "Nombre de usuario"}</p>
          <p className={Styles.user_username}>{currentUser ? (`@${currentUser.username}`) : "@usuario"}</p>
        </div>
      </div>
      <div className={Styles.follow_container}>
        <span className={Styles.followers}>{currentUser ? (`${currentUser.followers.length} seguidores`) : "0 seguidores"}</span>
        <span className={Styles.followers}>{currentUser ? (`${currentUser.following.length} seguidos`) : "0 seguidos"}</span>
      </div>
    </aside>
  )
}

export default User