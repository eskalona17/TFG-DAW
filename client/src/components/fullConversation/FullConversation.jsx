import { useContext, useState } from 'react';
import axios from 'axios';
const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;
import Styles from './fullConversation.module.css'
import { AuthContext } from '../../context/authContext';

const FullConversation = ({ conversation }) => {
  const { currentUser } = useContext(AuthContext);
  /* const [newMessage, setNewMessage] = useState('');

  const handleNewMessageChange = (event) => {
    setNewMessage(event.target.value);
  }

  const sendMessage = async (message) => {
    try {
      const recipientId = conversation.participants.find(participant => participant._id !== req.user._id)._id;
      const response = await axios.post(`${apiUrl}/api/messages/`, { recipientId, message });
      // Aquí asumimos que la respuesta incluye el mensaje que acabas de enviar
      conversation.messages.push(response.data);
      conversation.lastMessage = response.data;
    } catch (error) {
      console.error(error);
    }
  }

  const handleNewMessageSubmit = (event) => {
  event.preventDefault();
  if (newMessage.trim() !== '') {
    sendMessage(newMessage);
    setNewMessage('');
  }
 */

  return (
    <div className={Styles.conversation_container}>
      {conversation.map((message) => (
        <p key={message._id} className={`${Styles.message} ${message.sender === currentUser._id ? Styles.message_sent : Styles.message_received}`}>{message.text}</p>
      ))}
      {/* <form onSubmit={handleNewMessageSubmit}>
        <input type="text" value={newMessage} onChange={handleNewMessageChange} />
        <button type="submit">Enviar</button>
      </form> */}
    </div>
  )
}

export default FullConversation;