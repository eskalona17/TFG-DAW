import Styles from "./suggestedUserMini.module.css";
import Button from "../button/Button";
import url_image from "../../assets/img/media-1234.png"
import useFollowUnfollow from "../../hooks/useFollowUnfollow";

const SuggestedUserMini = ({ id, username }) => {
  const { currentUser, followUnfollow } = useFollowUnfollow();

  const isFollowing = currentUser.following.includes(id);
  const buttonText = isFollowing ? 'Eliminar' : 'Seguir';
  const buttonVariant = isFollowing ? 'secondary-small' : 'primary-small';
  const { user, user_container, user_img, user_info_container, user_info, button_container } =
    Styles;


  return (
    <div className={user}>
      <div className={user_container}>
        <img src={url_image} alt="" className={user_img} />
        <div className={user_info_container}>
          <p className={user_info}>@{username}</p>
          <div className={button_container}>
            <Button
              text={buttonText}
              onClick={() => followUnfollow(id)}
              variant={buttonVariant}
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
