import Styles from "./suggestedUserMini.module.css";
import Button from "../button/Button";

const SuggestedUserMini = ({ username }) => {
  const { user, user_container, user_img, user_info_container, user_info, button_container } =
    Styles;

  return (
    <div className={user}>
      <div className={user_container}>
        <img src="/media-1234.png" alt="" className={user_img} />
        <div className={user_info_container}>
          <p className={user_info}>{username}</p>
          <div className={button_container}>
            <Button
              text="Seguir"
              onClick={() => console.log("click")}
              variant="primary-small"
            />
            <Button
              text="Mensaje"
              onClick={() => console.log("click")}
              variant="secondary-small"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuggestedUserMini;
