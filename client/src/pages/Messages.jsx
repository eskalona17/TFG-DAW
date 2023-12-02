import Conversation from "../components/conversation/Conversation"
import { SocketContext } from "../context/SocketContext";
import { useContext, useEffect, useRef, useState } from "react";
const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;
import Message from "../components/message/Message";
import Loader from "../components/loader/Loader";
import Input from "../components/input/Input";
import Styles from './pages.module.css'
import axios from "axios";

const Messages = () => {
  const [activeConversation, setActiveConversation] = useState(null);
  const [conversations, setConversations] = useState([]);
  const [messages, setMessages] = useState({});
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const { socket } = useContext(SocketContext);
  const endOfMessagesRef = useRef(null);

  useEffect(() => {
    const getConversations = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${apiUrl}/api/messages/conversations`, { withCredentials: true });
        setConversations(response.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    getConversations();
  }, [setConversations]);

  useEffect(() => {
    if (activeConversation) {
      scrollToBottom();
    }
  }, [messages, activeConversation]);
  
  const scrollToBottom = () => {
    if (endOfMessagesRef.current) {
      const scrollHeight = endOfMessagesRef.current.scrollHeight;
      endOfMessagesRef.current.scrollTop = scrollHeight;
    }
  };

  const handleConversationClick = async (_id) => {
    try {
      const response = await axios.get(`${apiUrl}/api/messages/${_id}`, { withCredentials: true })
      const messages = response.data.messages;
      const conversation = response.data.conversation;
      setMessages({
        [conversation._id]: messages
      });
      setActiveConversation(conversation._id);
      if (activeConversation) {
        scrollToBottom();
      }
    } catch (error) {
      console.error(error);
    }
  }

  const handleSendMessage = async (recipientId, message) => {
    try {
      const response = await axios.post(`${apiUrl}/api/messages`, { recipientId, message }, { withCredentials: true });
      const newMessage = response.data.message;
      socket.emit('newMessage', newMessage);

      // Actualiza el estado `messages` para incluir el nuevo mensaje
      setMessages((prevMessages) => ({
        ...prevMessages,
        [activeConversation]: [...prevMessages[activeConversation], newMessage],
      }));

      // Actualiza el estado `conversations` para incluir el nuevo mensaje como el último mensaje de la conversación activa
      setConversations((prevConversations) => (
        prevConversations.map((conversation) => (
          conversation._id === activeConversation
            ? { ...conversation, lastMessage: newMessage, updatedAt: new Date() }
            : conversation
        ))
      ));
      setNewMessage('');
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    if (socket) {
      socket.on('newMessage', (newMessage) => {
        if (newMessage.conversationId === activeConversation) {
          setMessages(prevMessages => {
            const conversationMessages = prevMessages[newMessage.conversationId] || [];
            return {
              ...prevMessages,
              [newMessage.conversationId]: [...conversationMessages, newMessage],
            };
          });
          scrollToBottom();
        }
        setConversations((prevConversations) => (
          prevConversations.map((conversation) => (
            conversation._id === newMessage.conversationId
              ? { ...conversation, lastMessage: newMessage }
              : conversation
          ))
        ));
      });
    }
    return () => {
      if (socket) {
        socket.off('newMessage');
      }
    };
  }, [socket, activeConversation]);

  return (
    <main className="main">
      {loading ? (
        <Loader />
      ) : (
        <>
          {
            conversations.length === 0 && (
              <section className={Styles.message}>
                <p>No hay conversaciones</p>
              </section>
            )
          }
          {
            conversations.map((conversation) => (
              <section key={conversation._id} className={Styles.message}>
                <Conversation conversation={conversation} onClick={handleConversationClick} />
                {activeConversation === conversation._id &&
                  <div className={Styles.message_container} ref={endOfMessagesRef}>
                    {messages[conversation._id] && (
                      messages[conversation._id].map(message => (
                        <Message key={message._id} message={message} />
                      ))
                    )}
                    <Input
                      type="text"
                      value={newMessage}
                      placeholder="Escribe un mensaje..."
                      onClick={() => handleSendMessage(conversation.participants[0]._id, newMessage)}
                      onChange={(e) => setNewMessage(e.target.value)}
                    />
                  </div>
                }
              </section>
            ))
          }
        </>
      )}
    </main>
  )
}

export default Messages