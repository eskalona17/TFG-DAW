import Conversation from "../components/conversation/Conversation"
import { useContext, useEffect, useRef, useState } from "react";
import { SocketContext } from "../context/SocketContext";
const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;
import { AuthContext } from "../context/authContext";
import Message from "../components/message/Message";
import Loader from "../components/loader/Loader";
import Input from "../components/input/Input";
import Styles from './pages.module.css'
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

const Messages = () => {
  const location = useLocation();
  const locationConversation = location.state ? location.state.conversation : null;
  const [activeConversation, setActiveConversation] = useState(null);
  const [newMessageToSend, setNewMessageToSend] = useState('');
  const [conversations, setConversations] = useState([]);
  const { currentUser } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState({});
  const { socket } = useContext(SocketContext);
  const [unread, setUnread] = useState({});
  const endOfMessagesRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const getConversations = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${apiUrl}/api/messages/conversations`, { withCredentials: true });
        const res = response.data;

        const sortedConversations = res.conversations.sort((a, b) => {
          const aDate = a.lastMessage.text ? new Date(a.lastMessage.timestamp) : new Date(a.createdAt);
          const bDate = b.lastMessage.text ? new Date(b.lastMessage.timestamp) : new Date(b.createdAt);
          return bDate - aDate;
        });

        setConversations(sortedConversations);
        let unreadConversations = {};
        res.conversationsWithUnseenMessages.forEach((conversation) => {
          if (conversation.unreadMessages && conversation.lastMessage.sender !== currentUser._id) {
            unreadConversations[conversation._id] = conversation.unreadMessages;
          }
        });
        setUnread(unreadConversations);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
        scrollToBottom();
      }
    }
    getConversations();
    if (locationConversation) {
      setActiveConversation(locationConversation);
      navigate('.', { state: {} });
    }
  }, [setConversations, currentUser._id, locationConversation]);

  const scrollToBottom = () => {
    if (endOfMessagesRef.current) {
      const scrollHeight = endOfMessagesRef.current.scrollHeight;
      endOfMessagesRef.current.scrollTop = scrollHeight;
    }
  };

  useEffect(() => {
    if (activeConversation) {
      loadMessages(activeConversation);
    }
  }, [activeConversation]);

  useEffect(() => {
    if (endOfMessagesRef.current) {
      scrollToBottom();
    }
  }, [messages]);

  const loadMessages = async (activeConversation) => {
    if (!activeConversation.participants || !Array.isArray(activeConversation.participants) || activeConversation.participants.length === 0) {
      return;
    }

    const otherUserId = activeConversation.participants.find(participant => participant._id !== currentUser._id)._id;

    if (!otherUserId) {
      return;
    }

    try {
      const response = await axios.get(`${apiUrl}/api/messages/${otherUserId}`, { withCredentials: true });
      const messages = response.data.messages;
      socket.emit('markMessagesAsSeen', { conversationId: activeConversation._id });
      setMessages({
        [activeConversation._id]: messages
      });
      setUnread(prev => ({ ...prev, [activeConversation._id]: false }));
    } catch (error) {
      console.error(error);
    }
  }

  const handleSendMessage = async (recipientId, message) => {
    if (message.trim() === '') return;
    try {
      const response = await axios.post(`${apiUrl}/api/messages`, { recipientId, message }, { withCredentials: true });
      const newMessage = response.data.message;
      socket.emit('newMessage', newMessage);

      setMessages((prevMessages) => {
        const conversationMessages = prevMessages[activeConversation._id] || [];
        const updatedMessages = conversationMessages.map(message => ({ ...message, seen: true }));
        return {
          ...prevMessages,
          [activeConversation._id]: [...updatedMessages, newMessage],
        };
      });

      setConversations((prevConversations) => {
        const updatedConversations = prevConversations.map((conversation) => (
          conversation._id === activeConversation._id
            ? { ...conversation, lastMessage: { text: newMessage.text, sender: newMessage.sender, timestamp: newMessage.timestamp } }
            : conversation
        ))
        return updatedConversations.sort((a, b) => new Date(b.lastMessage.timestamp) - new Date(a.lastMessage.timestamp));
      });
      setNewMessageToSend('');
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    socket?.on('newMessage', (newMessage, messageConversation) => {
      setMessages(prevMessages => {
        const conversationMessages = prevMessages[newMessage.conversationId] || [];
        return {
          ...prevMessages,
          [newMessage.conversationId]: [...conversationMessages, newMessage],
        };
      });

      if (activeConversation && newMessage.conversationId === activeConversation._id) {
        scrollToBottom();
      } else {
        setUnread(prev => ({ ...prev, [newMessage.conversationId]: true }));
      }

      setConversations((prevConversations) => {
        const existingConversation = prevConversations.find(conversation => conversation._id === newMessage.conversationId);

        if (existingConversation) {
          const updatedConversations = prevConversations.map((conversation) => (
            conversation._id === newMessage.conversationId
              ? { ...conversation, lastMessage: newMessage }
              : conversation
          ));
          return [updatedConversations.find(conversation => conversation._id === newMessage.conversationId), ...updatedConversations.filter(conversation => conversation._id !== newMessage.conversationId)];
        } else {
          return [
            {
              ...messageConversation,
              lastMessage: {
                ...messageConversation.lastMessage,
                text: newMessage.text,
                sender: newMessage.sender
              }
            },
            ...prevConversations
          ];
        }
      });
    });
    return () => {
      if (socket) {
        socket.off('newMessage');
      }
    };
  }, [socket, activeConversation, messages]);

  useEffect(() => {
    socket?.on("messagesSeen", ({ conversationId }) => {
      setConversations((prev) => {
        const updatedConversations = prev.map((conversation) => {
          if (conversation._id === conversationId) {
            return {
              ...conversation,
              lastMessage: {
                ...conversation.lastMessage,
                seen: true,
              },
            };
          }
          return conversation;
        });
        return updatedConversations;
      });
      setUnread(prev => ({ ...prev, [conversationId]: false }));
    });
  }, [socket, setConversations]);

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
              <section key={conversation._id} className={`${Styles.message} ${unread[conversation._id] ? Styles.unread : ''}`}>
                <Conversation conversation={conversation} onClick={() => setActiveConversation(conversation)} />
                {activeConversation && activeConversation._id === conversation._id &&
                  <div className={Styles.message_container} ref={endOfMessagesRef}>
                    {messages[activeConversation._id]?.map(message => (
                      <Message key={message._id} message={message} />
                    )
                    )}
                    <Input
                      type="text"
                      value={newMessageToSend}
                      placeholder="Escribe un mensaje..."
                      onClick={() => handleSendMessage(conversation.participants[0]._id, newMessageToSend)}
                      onChange={(e) => setNewMessageToSend(e.target.value)}
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