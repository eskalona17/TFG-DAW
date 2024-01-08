import { createContext, useContext, useEffect, useRef, useState } from "react"
import io from "socket.io-client"
import axios from "axios";
import { useLocation } from "react-router-dom";
import { AuthContext } from "./AuthContext";
const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

export const SocketContext = createContext()

export const useSocket = () => {
  return useContext(SocketContext);
};

export const SocketContextProvider = ({ children }) => {
  const [socket, setSocket] = useState(null)
  const [loading, setLoading] = useState(false);
  const [onlineUsers, setOnlineUsers] = useState([])
  const [conversations, setConversations] = useState([])
  const [unread, setUnread] = useState({})
  const [messages, setMessages] = useState({})
  const [activeConversation, setActiveConversation] = useState(null)
  const [newMessageToSend, setNewMessageToSend] = useState('');
  const location = useLocation();
  const locationConversation = location.state?.conversation;

  const endOfMessagesRef = useRef(null);
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    if (!currentUser) {
      // Manejar el caso en el que no hay usuario almacenado.
      return;
    }

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
      }
    }

    getConversations();
    if (location.pathname !== '/messages') {
      setActiveConversation(null);
    }
  }, [currentUser?._id, location.pathname]);

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
      setUnread(prev => ({ ...prev, [activeConversation._id]: false }));
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    if (!currentUser) {
      // Manejar el caso en el que no hay usuario almacenado.
      return;
    }

    const socket = io(apiUrl, {
      query: {
        userId: currentUser?._id
      }
    })
    setSocket(socket)

    socket?.on("getOnlineUsers", (users) => {
      setOnlineUsers(users)
    })

    socket?.on('newMessage', (newMessage, messageConversation) => {
      setMessages(prevMessages => {
        const conversationMessages = prevMessages[newMessage.conversationId] || [];
        return {
          ...prevMessages,
          [newMessage.conversationId]: [...conversationMessages, newMessage],
        };
      });

      setUnread(prev => ({ ...prev, [newMessage.conversationId]: true }));

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
    })

    return () => {
      socket && socket.close()
    }
  }, [currentUser?._id])

  useEffect(() => {
    if (locationConversation) {
      setActiveConversation(locationConversation);
    }
  }, [locationConversation]);

  useEffect(() => {
    if (!currentUser || !activeConversation) {
      // Manejar el caso en el que no hay usuario activo o conversación activa.
      return;
    }

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

    loadMessages(activeConversation);
  }, [currentUser?._id, activeConversation, socket]);

  return (
    <SocketContext.Provider value={{ socket, loading, onlineUsers, conversations, setConversations, unread, setUnread, messages, setMessages, activeConversation, setActiveConversation, handleSendMessage, newMessageToSend, setNewMessageToSend, locationConversation, endOfMessagesRef }}>
      {children}
    </SocketContext.Provider>
  )
}