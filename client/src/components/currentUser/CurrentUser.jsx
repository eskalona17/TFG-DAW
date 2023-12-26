import Styles from "./currentUser.module.css";
import { useContext } from "react";
import Button from "../button/Button";
import { AuthContext } from "../../context/AuthContext";
import useUserImage from './../../hooks/useUserImage';
import { useNavigate } from "react-router-dom";

const CurrentUser = () => {
  const { currentUser } = useContext(AuthContext);
  const { userImage } = useUserImage(currentUser);
  const navigate = useNavigate();

  const {
    user,
    user_container,
    user_info,
    user_name,
    user_img,
    user_username,
    follow_container,
  } = Styles;

  return (
    <aside className={user}>
      <div className={user_container} onClick={() => navigate(`/${currentUser.username}`)}>
        <img src={userImage} alt="" className={user_img} />
        <div className={user_info}>
          <p className={user_name}>
            {currentUser ? currentUser.name : "Nombre de usuario"}
          </p>
          <p className={user_username}>
            {currentUser ? `@${currentUser.username}` : "@usuario"}
          </p>
        </div>
      </div>
      <div className={follow_container}>
        <Button
          text={
            currentUser
              ? `${currentUser.followers.length === 1
                ? `${currentUser.followers.length} seguidor`
                : `${currentUser.followers.length} seguidores`
              }`
              : "0 seguidores"
          }
          onClick={() => console.log("click")}
          variant="alternative"
        />
        <Button
          text={
            currentUser
              ? `${currentUser.following.length === 1
                ? `${currentUser.following.length} seguido`
                : `${currentUser.following.length} seguidos`
              }`
              : "0 seguidos"
          }
          onClick={() => console.log("click")}
          variant="alternative"
        />
      </div>
    </aside>
  );
};

export default CurrentUser;
