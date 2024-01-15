const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;
import { useNavigate } from "react-router-dom";
import Styles from "./Suggestions.module.css";
import { useContext, useEffect, useState } from "react";
import Button from "@/button/Button";
import axios from "axios";
import SuggestedUser from "@/suggestedUser/SuggestedUser";
import { AuthContext } from "@/context/AuthContext";
import Loader from "@/loader/Loader";

const Suggestions = () => {
  const navigate = useNavigate();
  const { currentUser } = useContext(AuthContext);

  const { suggestions, title, noSuggestionsMessage } = Styles;

  const [users, setUsers] = useState([]);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${apiUrl}/api/users/suggested-users?limit=4`, {
        withCredentials: true,
        params: { labels: currentUser.labels },
      })
      .then((response) => {
        const suggestedUsers = response.data
          .filter((user) => user._id !== currentUser._id)
          .sort((a, b) => {
            const aCoincidences = a.labels.filter((label) =>
              currentUser.labels.includes(label)
            ).length;
            const bCoincidences = b.labels.filter((label) =>
              currentUser.labels.includes(label)
            ).length;
            return bCoincidences - aCoincidences;
          });

        setUsers(suggestedUsers.slice(0, 3));
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setIsLoading(false);
      });
  }, [currentUser.labels, currentUser._id]);

  return (
    <div className={suggestions}>
      <h2 className={title}>Sugerencias</h2>
      {isLoading && <Loader />} {/* Mostrar Loader solo mientras se carga */}
      {users.length > 0 &&
        // If there are users
        users.map((user) => (
          <SuggestedUser key={user._id} user={user} version="mini" />
        ))}
      {users.length === 0 && !isLoading && (
        <>
          <p className={noSuggestionsMessage}>
            No hay usuarios sugeridos con tus preferencias en este momento.
          </p>
          <p className={noSuggestionsMessage}>
            Edita tus sugerencias para ver otros usuarios
          </p>
        </>
      )}
      <Button
        text="Ver más"
        onClick={() => navigate("/explora")}
        variant="primary"
      />
    </div>
  );
};

export default Suggestions;
