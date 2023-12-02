import { AuthContext } from '../../context/authContext'
import Styles from './message.module.css'
import { useContext } from 'react'

const Message = ({ message }) => {
  const { currentUser } = useContext(AuthContext)
  const { sender, text } = message
  const timestamp = new Date(message.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  return (
    <p className={`${Styles.message} ${sender === currentUser._id ? Styles.message_sent : Styles.message_received}`}>{text}<span className={Styles.timestamp}>{timestamp}</span></p>
  )
}

export default Message