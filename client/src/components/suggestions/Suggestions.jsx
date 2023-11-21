import Styles from "./Suggestions.module.css";
import SuggestedUserMini from "../suggestedUserMini/SuggestedUserMini";
import Button from "../button/Button";
import { useNavigate, useLocation } from "react-router-dom";

const Suggestions = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { suggestions, title } = Styles;

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
      <SuggestedUserMini username="@nachomenendez" />
      <SuggestedUserMini username="@fernandoeskalona" />
      <SuggestedUserMini username="@laurashauny" />
      <Button
        text="Ver más"
        onClick={() => navigate("/explora")}
        variant="primary"
      />
    </div>
  );
};

export default Suggestions;
