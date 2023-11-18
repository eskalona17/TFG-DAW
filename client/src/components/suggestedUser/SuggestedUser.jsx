import Styles from './suggestedUser.module.css'
import Button from '../button/Button';

const SuggestedUser = () => {
  return (
    <div className={Styles.user}>
      <div className={Styles.user_container}>
        <img src="/media-1234.png" alt="" className={Styles.user_img} />
        <div className={Styles.user_info_container}>
          <p className={Styles.user_info}>Nombre apellido apellido</p>
          <p className={Styles.user_info}>@username</p>
        </div>
      </div>
      <div className={Styles.button_container}>
        <Button text="Seguir" onClick={() => console.log('click')} variant="primary" />
        <Button text="Mensaje" onClick={() => console.log('click')} variant="secondary" />
      </div>
    </div>
  )
}

export default SuggestedUser