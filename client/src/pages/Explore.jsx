import SuggestedUser from "../components/suggestedUser/SuggestedUser";
const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;
import Button from '../components/button/Button';
import Loader from '../components/loader/Loader';
import { useState, useEffect } from 'react';
import axios from 'axios';

const Explore = () => {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios.get(`${apiUrl}/api/users/suggested-users?limit=5`, {
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
    axios.get(`${apiUrl}/api/users/suggested-users?page=${page + 1}&limit=5`, {
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
    <main className="main">
      {loading ? (
        <Loader />
      ) : (
        <>
          {users.map(user => (
            <SuggestedUser key={user._id} user={user} version='full' />
          ))}
          <Button
            text="Ver más"
            onClick={loadMoreUsers}
            variant="primary"
          />
        </>
      )}
    </main>
  );
}

export default Explore