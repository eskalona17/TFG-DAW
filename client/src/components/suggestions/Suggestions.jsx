import Styles from "./Suggestions.module.css";
import SuggestedUserMini from "../suggestedUserMini/SuggestedUserMini";
import Button from "../button/Button";
import { useNavigate } from "react-router-dom";

const Suggestions = () => {
  const navigate = useNavigate();
  /* const location = useLocation(); */

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
      <SuggestedUserMini username="@fereskalona" />
      <SuggestedUserMini username="@lauratortosa" />
      <Button
        text="Ver más"
        onClick={() => navigate("/explora")}
        variant="primary"
      />
    </div>
  );
};

export default Suggestions;
