import Styles from './suggestedUserMini.module.css'
import Button from '../button/Button';

const SuggestedUserMini = ({ username }) => {

  return (
    <div className={Styles.user}>
      <div className={Styles.user_container}>
        <img src="/media-1234.png" alt="" className={Styles.user_img} />
        <div className={Styles.user_info_container}>
          <p className={Styles.user_info}>{username}</p>
          <div className={Styles.button_container}>
            <Button text="Seguir" onClick={() => console.log('click')} variant="primary-small" />
            <Button text="Mensaje" onClick={() => console.log('click')} variant="secondary-small" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default SuggestedUserMini