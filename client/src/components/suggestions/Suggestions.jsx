const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;
import { useNavigate } from "react-router-dom";
import Styles from "./Suggestions.module.css";
import { useContext, useEffect, useState } from "react";
import Button from "../button/Button";
import axios from 'axios';
import SuggestedUser from "../suggestedUser/SuggestedUser";
import { AuthContext } from "../../context/AuthContext";

const Suggestions = () => {
  const navigate = useNavigate();
  const { currentUser } = useContext(AuthContext);

  const { suggestions, title } = Styles;

  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get(`${apiUrl}/api/users/suggested-users?limit=4`, {
      withCredentials: true
    })
      .then(response => {
        const otherUsers = response.data.filter(user => user._id !== currentUser._id);
        setUsers(otherUsers.slice(0, 3));
      })
      .catch(error => console.error(error));
  }, [currentUser._id]);

  return (
    <div className={suggestions}>
      <h2 className={title}>Sugerencias</h2>
      {users.map(user => (
        <SuggestedUser key={user._id} user={user} version='mini' />
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
