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

  const { suggestions, title, noSuggestionsMessage } = Styles;

  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios
      .get(`${apiUrl}/api/users/suggested-users?limit=4`, {
        withCredentials: true,
        params: { labels: currentUser.labels }
      })
      .then((response) => {
        const suggestedUsers = response.data
          .filter((user) => user._id !== currentUser._id)
          .sort((a, b) => {
            const aCoincidences = a.labels.filter(label => currentUser.labels.includes(label)).length;
            const bCoincidences = b.labels.filter(label => currentUser.labels.includes(label)).length;
            return bCoincidences - aCoincidences;
          });

          console.log(suggestedUsers);
  
        setUsers(suggestedUsers.slice(0, 3));
      })
      .catch((error) => console.error(error));
  }, [currentUser.labels, currentUser._id]);

  return (
    <div className={suggestions}>
      <h2 className={title}>Sugerencias</h2>
      {users.map(user => (
        <SuggestedUser key={user._id} user={user} version='mini' />
      ))}
      <Button
        text="Ver más"
        onClick={() => navigate("/explora")}
        variant="primary"
      />
    </div>
  );
};

export default Suggestions;
