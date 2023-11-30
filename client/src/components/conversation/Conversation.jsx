import Styles from './conversation.module.css'
import url_image from "../../assets/img/media-1234.png";
const Conversation = ({ onClick, name, username, lastSender, lastMessage }) => {
  return (
    <div className={Styles.conversation} onClick={onClick}>
      <img src={url_image} alt="" className={Styles.image} />
      <div className={Styles.info_container}>
        <div className={Styles.info}>
          <p className={Styles.name}>{name}</p>
          <p className={Styles.username}>@{username}</p>
          {/* <p className={Styles.date}>{date}</p> */}
        </div>
        <p className={Styles.last_message}>{lastSender}: {lastMessage}</p>
      </div>
    </div>
  )
}

export default Conversation