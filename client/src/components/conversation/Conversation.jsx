import useUserImage from "../../hooks/useUserImage";
import { formatDistanceToNow } from 'date-fns';
import Styles from './conversation.module.css'
import { es } from 'date-fns/locale';

const Conversation = ({ conversation, onClick }) => {
  const { lastMessage, participants } = conversation
  const { sender, text, timestamp } = lastMessage
  const { _id, name, username } = participants[0]
  const { userImage } = useUserImage(participants[0], '75');
  const timeAgo = formatDistanceToNow(new Date(timestamp), { addSuffix: true, locale: es });

  return (
    <div className={Styles.conversation} onClick={() => onClick(_id)} >
      <img src={userImage} alt="" className={Styles.image} />
      <div className={Styles.info_container}>
        <div className={Styles.info}>
          <p className={Styles.name}>{name}</p>
          <p className={Styles.username}>@{username}</p>
          <p className={Styles.date}>{timeAgo}</p>
        </div>
        <p className={Styles.last_message}>{sender === _id ? name.split(' ')[0] : 'Tú'}: {text}</p>
      </div>
    </div>
  )
}

export default Conversation