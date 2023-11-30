import Styles from "./suggestedUserMini.module.css";
import Button from "../button/Button";
import useFollowUnfollow from "../../hooks/useFollowUnfollow";
import useUserImage from "../../hooks/useUserImage";

const SuggestedUserMini = ({ user }) => {
  const { currentUser, followUnfollow } = useFollowUnfollow();
  const { userImage } = useUserImage(user, '75');
  const { _id, username } = user;

  const isFollowing = currentUser.following.includes(_id);
  const buttonText = isFollowing ? 'Eliminar' : 'Seguir';
  const buttonVariant = isFollowing ? 'secondary-small' : 'primary-small';
  const { user_container, user_img, user_info_container, user_info, button_container } =
    Styles;


  return (
    <div className={Styles.user}>
      <div className={user_container}>
        <img src={userImage} alt="" className={user_img} />
        <div className={user_info_container}>
          <p className={user_info}>@{username}</p>
          <div className={button_container}>
            <Button
              text={buttonText}
              onClick={() => followUnfollow(_id)}
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
