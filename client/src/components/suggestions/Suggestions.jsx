import SuggestedUserMini from "../suggestedUserMini/SuggestedUserMini";
const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;
import { useNavigate } from "react-router-dom";
import Styles from "./Suggestions.module.css";
import { useEffect, useState } from "react";
import Button from "../button/Button";
import axios from 'axios';

const Suggestions = () => {
  const navigate = useNavigate();
  /* const location = useLocation(); */

  const { suggestions, title } = Styles;

  const [users, setUsers] = useState([]);
  
  useEffect(() => {
    axios.get(`${apiUrl}/api/users/suggested-users?limit=3`, {
      withCredentials: true
    })
      .then(response => setUsers(response.data))
      .catch(error => console.error(error));
  }, []);

  /* if (location.pathname === '/explora') {
    return (
      <div className={Styles.suggestions}>
        <Button text="Ver más" onClick={() => navigate('/explora')} variant="primary" />
      </div>
    );
  } */

  return (
    <div className={suggestions}>
      <h2 className={title}>Sugerencias</h2>
      {users.map(user => (
        <SuggestedUserMini key={user._id} user={user} />
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
