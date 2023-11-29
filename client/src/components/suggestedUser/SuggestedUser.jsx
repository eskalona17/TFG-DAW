import Styles from "./suggestedUser.module.css";
import Button from "../button/Button";
import useUserImage from "../../hooks/useUserImage";
import useFollowUnfollow from './../../hooks/useFollowUnfollow';

const SuggestedUser = ({ user }) => {
  const { userImage } = useUserImage(user, '75');
  const { _id, name, username } = user;
  const { currentUser, followUnfollow } = useFollowUnfollow();

  const isFollowing = currentUser.following.includes(user._id);
  const buttonText = isFollowing ? 'Eliminar' : 'Seguir';
  const buttonVariant = isFollowing ? 'secondary' : 'primary';

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
          text={buttonText}
          onClick={() => followUnfollow(_id)}
          variant={buttonVariant}
        />
        <Button
          text="Mensaje"
          onClick={() => console.log("mensaje")}
          variant="secondary"
        />
      </div>
    </div>
  );
};

export default SuggestedUser;
