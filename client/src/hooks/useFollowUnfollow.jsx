const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;
import { AuthContext } from '../context/AuthContext';
import { useContext, useEffect } from 'react';
import axios from 'axios';
import { SocketContext } from '../context/SocketContext';

const useFollowUnfollow = () => {
  const { currentUser, setCurrentUser } = useContext(AuthContext);
  const { socket } = useContext(SocketContext);

  const followUnfollow = async (id) => {
    try {
      await axios.post(`${apiUrl}/api/users/follow/${id}`, {}, {
        withCredentials: true
      })
      if (currentUser.following.includes(id)) {
        socket.emit('userUnfollow', id);
      } else {
        socket.emit('userFollow', id);
      }

      setCurrentUser(prevUser => {
        if (prevUser.following.includes(id)) {
          return { ...prevUser, following: prevUser.following.filter(userId => userId !== id) };
        } else {
          return { ...prevUser, following: [...prevUser.following, id] };
        }
      });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    socket?.on('userFollow', (id) => {
      setCurrentUser(prevUser => {
        if (prevUser._id === id && !prevUser.followers.includes(currentUser._id)) {
          return { ...prevUser, followers: [...prevUser.followers, currentUser._id] };
        } else {
          return prevUser;
        }
      });
    });

    socket?.on('userUnfollow', (id) => {
      setCurrentUser(prevUser => {
        if (prevUser._id === id && prevUser.followers.includes(currentUser._id)) {
          return { ...prevUser, followers: prevUser.followers.filter(userId => userId !== currentUser._id) };
        } else {
          return prevUser;
        }
      });
    });

    return () => {
      socket?.off('userFollow');
      socket?.off('userUnfollow');
    };
  }, [socket, currentUser._id, setCurrentUser]);

  return { currentUser, followUnfollow };
};

export default useFollowUnfollow;