import Styles from './conversation.module.css'
import url_image from "../../assets/img/media-1234.png";
const Conversation = ({ conversation, onClick }) => {
  const { lastMessage, participants } = conversation
  const { sender, text } = lastMessage
  const participant = participants[0]

  if (!participant) return null

  const { _id, name, username } = participants[0]

  return (
    <div className={Styles.conversation} onClick={() => onClick(_id)} >
      <img src={url_image} alt="" className={Styles.image} />
      <div className={Styles.info_container}>
        <div className={Styles.info}>
          <p className={Styles.name}>{name}</p>
          <p className={Styles.username}>@{username}</p>
          {/* <p className={Styles.date}>{date}</p> */}
        </div>
        <p className={Styles.last_message}>{sender === _id ? name.split(' ')[0] : 'Tú'}: {text}</p>
      </div>
    </div>
  )
}

export default Conversation