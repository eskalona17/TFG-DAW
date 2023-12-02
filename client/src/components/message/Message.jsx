import { AuthContext } from '../../context/authContext'
import Styles from './message.module.css'
import { useContext } from 'react'

const Message = ({ message }) => {
  const { currentUser } = useContext(AuthContext)
  const { sender, text } = message

  return (
    <p className={`${Styles.message} ${sender === currentUser._id ? Styles.message_sent : Styles.message_received}`}>{text}</p>
  )
}

export default Message