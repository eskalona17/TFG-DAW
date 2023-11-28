import Styles from "./suggestedUser.module.css";
import Button from "../button/Button";
import followUnfollow from "../../hooks/followUnfollow";
import useUserImage from "../../hooks/useUserImage";

const SuggestedUser = ({ user }) => {
  const { userImage } = useUserImage(user, '75');
  const { _id, name, username } = user;

  const {
    user_container,
    user_img,
    user_info_container,
    user_info,
    button_container,
  } = Styles;

  return (
    <div className={Styles.user}>
      <div className={user_container}>
        <img src={userImage} alt="" className={user_img} />
        <div className={user_info_container}>
          <p className={user_info}>{name}</p>
          <p className={user_info}>@{username}</p>
        </div>
      </div>
      <div className={button_container}>
        <Button
          text="Seguir"
          onClick={() => followUnfollow(_id)}
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
