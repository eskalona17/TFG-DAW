const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const useConversations = (userId) => {
  const [activeConversation, setActiveConversation] = useState(null);
  const [conversations, setConversations] = useState([]);
  /* const navigate = useNavigate(); */

  useEffect(() => {
    const fetchConversations = async () => {
      try {
        const response = await axios.get(`${apiUrl}/api/messages/conversation/${userId}`, { withCredentials: true });
        
        const conversation = response.data;
        console.log(conversation);

        if(conversation) {
          setActiveConversation(conversation);
        }

        if(!conversation) {
          const newConversation = await axios.post(`${apiUrl}/api/messages/new`, { userId }, { withCredentials: true });
          setConversations(prevConversations => [...prevConversations, newConversation]);
          setActiveConversation(newConversation);
        }

      } catch (error) {
        console.error(error);
      }
    };
    
    fetchConversations();
  }, [userId]);

  console.log(activeConversation);

  return { activeConversation, conversations };
};

export default useConversations;