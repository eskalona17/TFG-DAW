import Styles from "./suggestedUser.module.css";
import Button from "../button/Button";
import url_image from "../../assets/img/media-1234.png";

const SuggestedUser = ({ name, username }) => {
  const {
    user,
    user_container,
    user_img,
    user_info_container,
    user_info,
    button_container,
  } = Styles;

  return (
    <div className={user}>
      <div className={user_container}>
        <img src={url_image} alt="" className={user_img} />
        <div className={user_info_container}>
          <p className={user_info}>{name}</p>
          <p className={user_info}>@{username}</p>
        </div>
      </div>
      <div className={button_container}>
        <Button
          text="Seguir"
          onClick={() => console.log("click")}
          variant="primary"
        />
        <Button
          text="Mensaje"
          onClick={() => console.log("click")}
          variant="secondary"
        />
      </div>
    </div>
  );
};

export default SuggestedUser;
