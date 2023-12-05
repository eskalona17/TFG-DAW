import useFollowUnfollow from "./../../hooks/useFollowUnfollow";
const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;
import useUserImage from "../../hooks/useUserImage";
import Styles from "./suggestedUser.module.css";
import { useNavigate } from 'react-router-dom';
import Button from "../button/Button";
import axios from "axios";

const SuggestedUser = ({ user, version }) => {
  const { currentUser, followUnfollow } = useFollowUnfollow();
  const { userImage } = useUserImage(user, '75');
  const { _id, name, username } = user;
  const navigate = useNavigate();

  const isFollowing = currentUser.following.includes(_id);
  const buttonText = isFollowing ? 'Eliminar' : 'Seguir';
  const followBtnVariant = version === 'full'
    ? (isFollowing ? 'secondary' : 'primary')
    : (isFollowing ? 'secondary-small' : 'primary-small');
  const messageBtnVariant = version === 'full' ? 'secondary' : 'secondary-small';

  const sendMessage = async (recipientId) => {
    try {
      const response = await axios.post(`${apiUrl}/api/messages/conversation/`, { recipientId}, { withCredentials: true });
      const conversation = response.data.conversation;
      if (!conversation) {
        return
      }
      navigate('/mensajes', { state: { conversation } });
    } catch (error) {
      console.error(error);
    }
  };

  if (version === 'full') {
    return (
      <div className={Styles.user}>
        <div className={Styles.user_container}>
          <img src={userImage} alt="" className={Styles.user_img} />
          <div className={Styles.user_info_container}>
            <p className={Styles.user_info}>{name}</p>
            <p className={Styles.user_info}>@{username}</p>
          </div>
        </div>
        <div className={Styles.button_container}>
          <Button
            text={buttonText}
            onClick={() => followUnfollow(_id)}
            variant={followBtnVariant}
          />
          <Button
            text="Mensaje"
            onClick={() => sendMessage(_id)}
            variant={messageBtnVariant}
          />
        </div>
      </div>
    );
  } else {
    return (
      <div className={Styles.user_small}>
        <div className={Styles.user_container_small}>
          <img src={userImage} alt="" className={Styles.user_img_small} />
          <div className={Styles.user_info_container_small}>
            <p className={Styles.user_info_small}>@{username}</p>
            <div className={Styles.button_container_small}>
              <Button
                text={buttonText}
                onClick={() => followUnfollow(_id)}
                variant={followBtnVariant}
              />
              <Button
                text="Mensaje"
                onClick={() => sendMessage(_id)}
                variant={messageBtnVariant}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default SuggestedUser;
