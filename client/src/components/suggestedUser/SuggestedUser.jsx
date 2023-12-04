import useFollowUnfollow from "./../../hooks/useFollowUnfollow";
const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;
import useUserImage from "../../hooks/useUserImage";
import Styles from "./suggestedUser.module.css";
import Button from "../button/Button";
import { useState } from "react";
import axios from "axios";

const SuggestedUser = ({ user, version }) => {
  const { currentUser, followUnfollow } = useFollowUnfollow();
  const { userImage } = useUserImage(user, '75');
  const { _id, name, username } = user;
  const { activeConversation, setActiveConversation} = useState(null);

  const isFollowing = currentUser.following.includes(_id);
  const buttonText = isFollowing ? 'Eliminar' : 'Seguir';
  const followBtnVariant = version === 'full' 
    ? (isFollowing ? 'secondary' : 'primary') 
    : (isFollowing ? 'secondary-small' : 'primary-small');
  const messageBtnVariant = version === 'full' ? 'secondary' : 'secondary-small';

  const handleClick = async (_id) => {
    try {
      const response = await axios.get(`${apiUrl}/api/messages/conversation/${_id}`, { withCredentials: true });
      
      const conversation = response.data;

      if(conversation) {
        setActiveConversation(conversation);
      }

      if(!conversation) {
        const newConversation = await axios.post(`${apiUrl}/api/messages/new`, { _id }, { withCredentials: true });
        setActiveConversation(newConversation);
      }
    } catch (error) {
      console.error(error);
    }
    return activeConversation;
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
            onClick={() => handleClick(_id)}
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
                onClick={() => console.log("click")}
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
