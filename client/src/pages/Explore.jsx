import SuggestedUser from "@/components/suggestedUser/SuggestedUser";
import { useState, useEffect, useContext } from 'react';
import { AuthContext } from "@/context/AuthContext";
import Button from '@/components/button/Button';
import Loader from '@/components/loader/Loader';
import axios from 'axios';

const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

const Explore = () => {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [newLoading, setNewLoading] = useState(false);
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    setLoading(true);
    axios.get(`${apiUrl}/api/users/suggested-users?limit=5`, {
      withCredentials: true
    })
      .then(response => {
        const otherUsers = response.data.filter(user => user._id !== currentUser._id);
        setUsers(otherUsers);
        setLoading(false);
      })
      .catch(error => {
        console.error(error);
        setLoading(false);
      });
  }, []);

  const loadMoreUsers = () => {
    setNewLoading(true);
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
        setNewLoading(false);
      })
      .catch(error => {
        console.error(error);
      })
      .finally(() => {
        setLoading(false);
        setNewLoading(false);
      })
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
          {newLoading && <Loader />}
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