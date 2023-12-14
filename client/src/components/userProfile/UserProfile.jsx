import { useContext, useState } from 'react';
import useGetUserProfile from '../../hooks/getUserProfile';
import Loader from '../loader/Loader';
import Styles from './userProfile.module.css';
import useUserImage from '../../hooks/useUserImage';
import { AuthContext } from '../../context/authContext';
import Button from '../button/Button';

const UserProfile = () => {
  const { loading, user } = useGetUserProfile();
  const { currentUser } = useContext(AuthContext);
  const { userImage } = useUserImage(currentUser);
  const [isActive, setIsActive] = useState(false);
  /* console.log(user); */

  if (loading) {
    return <Loader />
  }

  if (!user) {
    return <p>Usuario no encontrado</p>
  }

  const handleClick = () => {
    
  }

  return (
    <main className="main">
      <div className={Styles.user_profile}>
        <div>
          <img src={userImage} alt="" className={Styles.user_img} />
        </div>
        <p>
          {currentUser ? currentUser.name : "Nombre de usuario"}
        </p>
        <p>
          {currentUser ? `@${currentUser.username}` : "@usuario"}
        </p>
        <div className={Styles.follow_container}>
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
      </div>
      <div className={Styles.user_filter}>
        <button
          className={`${Styles.button} ${isActive ? Styles.active : ''}`}
          onClick={handleClick}
        >
          Publicaciones
        </button>
        <button
          className={`${Styles.button} ${isActive ? Styles.active : ''}`}
          onClick={handleClick}
        >
          Multimedia
        </button>
      </div>
    </main>
  );
};

export default UserProfile;