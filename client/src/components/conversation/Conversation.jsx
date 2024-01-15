import LabelProfesional from "../labelProfesional/LabelProfesional";
import { SocketContext } from "@/context/SocketContext";
import useUserImage from "@/hooks/useUserImage";
import { formatDistanceToNow } from 'date-fns';
import { useNavigate } from "react-router-dom";
import Styles from './conversation.module.css'
import { es } from 'date-fns/locale';
import { useContext } from "react";

const Conversation = ({ conversation, onClick }) => {
  const { onlineUsers } = useContext(SocketContext)
  const { lastMessage, participants, createdAt } = conversation
  const { sender, text, timestamp } = lastMessage
  const { _id, name, username } = participants[0]
  const { userImage } = useUserImage(participants[0], '75');
  const timeAgo = lastMessage.text ? formatDistanceToNow(new Date(timestamp), { addSuffix: true, locale: es }) : formatDistanceToNow(new Date(createdAt), { addSuffix: true, locale: es })
  const online = onlineUsers.includes(_id)
  const navigate = useNavigate();

  return (
    <div className={Styles.conversation} onClick={() => onClick(_id)} >
      <img src={userImage} alt="" className={Styles.image} onClick={() => navigate(`/${username}`)} />
      <span className={`${online ? Styles.online : Styles.offline}`}></span>
      <div className={Styles.info_container}>
        <div className={Styles.info}>
          <p className={Styles.name}>{name}</p>
          <p className={Styles.username}>@{username}</p>
          <p className={Styles.date}>{timeAgo}</p>
        </div>
        <p className={Styles.last_message}>{sender === _id ? name.split(' ')[0] : 'Tú'}: {text}</p>
        {participants[0].profile === 'profesional' 
          ? <LabelProfesional />
          : null
        }
      </div>
    </div>
  )
}

export default Conversation