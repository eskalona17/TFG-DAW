import { useState, useEffect } from 'react';
import SuggestedUser from '../suggestedUser/SuggestedUser';
const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;
import axios from 'axios';
import Button from '../button/Button';

const SuggestedUsers = () => {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  
  useEffect(() => {
    axios.get(`${apiUrl}:1234/api/users/suggested-users?limit=5`, {
      withCredentials: true
    })
      .then(response => setUsers(response.data))
      .catch(error => console.error(error));
  }, []);

  const loadMoreUsers = () => {
    axios.get(`${apiUrl}:1234/api/users/suggested-users?page=${page + 1}&limit=5`, {
      withCredentials: true
    })
      .then(response => {
        if (response.data.length === 0) {
          return;
        }
  
        const newUsers = response.data.filter(newUser => !users.some(user => user._id === newUser._id));
        setUsers(prevUsers => [...prevUsers, ...newUsers]);
        setPage(page + 1);
      })
      .catch(error => console.error(error));
  };

  return (
    <>
      {users.map(user => (
        <SuggestedUser key={user._id} name={user.name} username={user.username} />
      ))}
      <Button
          text="Ver más"
          onClick={loadMoreUsers}
          variant="primary"
        />
    </>
  );
};

export default SuggestedUsers;