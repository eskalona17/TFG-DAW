import FullConversation from "../components/fullConversation/FullConversation";
import Conversation from "../components/conversation/Conversation"
const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;
import Styles from './pages.module.css'
import { useEffect, useState } from "react";
import axios from "axios";

const Messages = () => {
  const [conversations, setConversations] = useState([]);
  const [currentConversation, setCurrentConversation] = useState({});

  const fetchConversations = async () => {
    try {
      const response = await axios.get(`${apiUrl}/api/messages/conversations`, { withCredentials: true });
      setConversations(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchConversations();
  }, []);

  const handleConversationClick = async (conversation) => {
    try {
      const otherUserId = conversation.participants[1]._id;
      const response = await axios.get(`${apiUrl}/api/messages/${otherUserId}`, { withCredentials: true })
      setCurrentConversation(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <main className="main">
      {conversations.length === 0 && (
        <section>
          <p>No hay conversaciones</p>
        </section>
      )}
      {conversations.map((conversation) => {
        let lastSender = conversation.participants.find(participant => participant._id === conversation.lastMessage.sender)
        lastSender.username === (conversation.participants[0].username) ? lastSender.name = "Tú" : lastSender.name
        return (
          <section key={conversation._id} className={Styles.message} onClick={() => handleConversationClick(conversation)}>
            <Conversation
              name={conversation.participants[1].name}
              username={conversation.participants[1].username}
              lastSender={lastSender.name}
              lastMessage={conversation.lastMessage.text}
            />
            {currentConversation[0] && currentConversation[0].conversationId === conversation._id && (
            <FullConversation conversation={currentConversation} />
          )}
          </section>
        )
      })}

    </main>
  )
}

export default Messages