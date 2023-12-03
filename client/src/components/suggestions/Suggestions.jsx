const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;
import { useNavigate } from "react-router-dom";
import Styles from "./Suggestions.module.css";
import { useEffect, useState } from "react";
import Button from "../button/Button";
import axios from 'axios';
import SuggestedUser from "../suggestedUser/SuggestedUser";

const Suggestions = () => {
  const navigate = useNavigate();

  const { suggestions, title } = Styles;

  const [users, setUsers] = useState([]);
  
  useEffect(() => {
    axios.get(`${apiUrl}/api/users/suggested-users?limit=3`, {
      withCredentials: true
    })
      .then(response => setUsers(response.data))
      .catch(error => console.error(error));
  }, []);

  return (
    <div className={suggestions}>
      <h2 className={title}>Sugerencias</h2>
      {users.map(user => (
        <SuggestedUser key={user._id} user={user} variant='mini' />
      ))}
      <Button
        text="Ver más"
        onClick={() => navigate("/explora")}
        variant="primary"
      />
    </div>
  );
};

export default Suggestions;
