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

const Messages = () => {
  const [activeConversation, setActiveConversation] = useState(null);
  const [newMessageToSend, setNewMessageToSend] = useState('');
  const [conversations, setConversations] = useState([]);
  const { currentUser } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState({});
  const { socket } = useContext(SocketContext);
  const [unread, setUnread] = useState({});
  const endOfMessagesRef = useRef(null);

  useEffect(() => {
    const getConversations = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${apiUrl}/api/messages/conversations`, { withCredentials: true });
        const res = response.data;
        setConversations(res.conversations);
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
      }
    }
    getConversations();
  }, [setConversations, currentUser._id]);

  const scrollToBottom = () => {
    if (endOfMessagesRef.current) {
      const scrollHeight = endOfMessagesRef.current.scrollHeight;
      endOfMessagesRef.current.scrollTop = scrollHeight;
    }
  };

  const loadMessages = async (conversation) => {
    const otherUserId = conversation.participants.find(participant => participant._id !== currentUser._id)._id;
    try {
      const response = await axios.get(`${apiUrl}/api/messages/${otherUserId}`, { withCredentials: true });
      const messages = response.data.messages;
      const conversation = response.data.conversation;
      socket.emit('markMessagesAsSeen', { conversationId: conversation._id });
      setMessages({
        [conversation._id]: messages
      });
      setUnread(prev => ({ ...prev, [conversation._id]: false }));
      scrollToBottom();
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    if (activeConversation) {
      loadMessages(activeConversation);
    }
    if (endOfMessagesRef.current) {
      scrollToBottom();
    }
  }, [activeConversation]);

  useEffect(() => {
    if (endOfMessagesRef.current) {
      scrollToBottom();
    }
  }, [messages]);

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

      setConversations((prevConversations) => (
        prevConversations.map((conversation) => (
          conversation._id === activeConversation._id
            ? { ...conversation, lastMessage: { text: newMessage.text, sender: newMessage.sender, timestamp: newMessage.timestamp } }
            : conversation
        ))
      ));
      setNewMessageToSend('');
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    socket?.on('newMessage', (newMessage) => {
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
        const updatedConversations = prevConversations.map((conversation) => (
          conversation._id === newMessage.conversationId
            ? { ...conversation, lastMessage: newMessage }
            : conversation
        ))
        return [updatedConversations.find(conversation => conversation._id === newMessage.conversationId), ...updatedConversations.filter(conversation => conversation._id !== newMessage.conversationId)];
      });
    });
    return () => {
      if (socket) {
        socket.off('newMessage');
      }
    };
  }, [socket, activeConversation]);

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