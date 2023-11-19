import Styles from './currentUser.module.css'
import { useContext } from 'react'
import { AuthContext } from "../../context/AuthContext"
import Button from '../button/Button'


const CurrentUser = () => {
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
        <Button text={currentUser ? (`${currentUser.followers.length === 1 ? `${currentUser.followers.length} seguidor` : `${currentUser.followers.length} seguidores`}`) : "0 seguidores"} onClick={() => console.log('click')} variant="alternative" />
        <Button text={currentUser ? (`${currentUser.following.length === 1 ? `${currentUser.following.length} seguido` : `${currentUser.following.length} seguidos`}`) : "0 seguidos"} onClick={() => console.log('click')} variant="alternative" />

      </div>
    </aside>
  )
}

export default CurrentUser