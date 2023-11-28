import { useState, useEffect } from 'react';
import SuggestedUser from '../suggestedUser/SuggestedUser';
const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;
import axios from 'axios';
import Button from '../button/Button';
import 'ldrs/bouncy'
import Styles from './suggestedUsers.module.css';

const SuggestedUsers = () => {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios.get(`${apiUrl}:1234/api/users/suggested-users?limit=5`, {
      withCredentials: true
    })
      .then(response => {
        setUsers(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error(error);
        setLoading(false);
      });
  }, []);

  const loadMoreUsers = () => {
    setLoading(true);
    axios.get(`${apiUrl}:1234/api/users/suggested-users?page=${page + 1}&limit=5`, {
      withCredentials: true
    })
      .then(response => {
        if (response.data.length === 0) {
          setLoading(false);
          return;
        }

        const newUsers = response.data.filter(newUser => !users.some(user => user._id === newUser._id));
        setUsers(prevUsers => [...prevUsers, ...newUsers]);
        setPage(page + 1);
        setLoading(false);
      })
      .catch(error => {
        console.error(error);
        setLoading(false);
      });
  };

  return (
    <>
      {loading ? (
        <div className={Styles.loader}>
        <l-bouncy size="45" speed="1.75" color="#ffa07a" />
      </div>
      ) : (
        <>
          {users.map(user => (
            <SuggestedUser key={user._id} user={user}  />
          ))}
          <Button
            text="Ver más"
            onClick={loadMoreUsers}
            variant="primary"
          />
        </>
      )}
    </>
  );
};

export default SuggestedUsers;