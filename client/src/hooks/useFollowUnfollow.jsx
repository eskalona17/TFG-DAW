const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;
import { AuthContext } from '../context/authContext';
import { useContext } from 'react';
import axios from 'axios';

const useFollowUnfollow = () => {
  const { currentUser, setCurrentUser } = useContext(AuthContext);

  const followUnfollow = (id) => {
    axios.post(`${apiUrl}:1234/api/users/follow/${id}`, {}, {
      withCredentials: true
    })
      .then(response => {
        console.log(response.data.message);
        setCurrentUser(prevUser => {
          if (prevUser.following.includes(id)) {
            return { ...prevUser, following: prevUser.following.filter(userId => userId !== id) };
          } else {
            return { ...prevUser, following: [...prevUser.following, id] };
          }
        });
      })
      .catch(error => {
        console.error(error);
      });
  };

  return { currentUser, followUnfollow };
};

export default useFollowUnfollow;