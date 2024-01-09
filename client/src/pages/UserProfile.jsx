import useGetUserProfile from '../hooks/useGetUserProfile';
import { useEffect, useState } from 'react';
import PostItem from '../components/postItem/PostItem';
import Loader from '../components/loader/Loader';
import useUserImage from '../hooks/useUserImage';
import Button from '../components/button/Button';
import { useLocation, useNavigate } from 'react-router-dom';
import Styles from './pages.module.css';
import axios from 'axios';
import useFollowUnfollow from '../hooks/useFollowUnfollow';

const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

const UserProfile = () => {
  const { currentUser, followUnfollow } = useFollowUnfollow();
  const { loading, user } = useGetUserProfile();
  const { userImage } = useUserImage(user);
  const [activeButton, setActiveButton] = useState('publications');
  const [userPosts, setUserPosts] = useState([]);
  const [userMediaPosts, setUserMediaPosts] = useState([]);
  const isFollowing = currentUser?.following.includes(user?._id);
  const buttonText = isFollowing ? 'No seguir' : 'Seguir';
  const location = useLocation();
  const username = location.pathname.split('/')[1];
  const navigate = useNavigate();

  useEffect(() => {
    getUserPosts();
    handleButtonChange('publications');
  }, [location]);

  const getUserPosts = async () => {
    try {
      const response = await axios.get(`${apiUrl}/api/posts/user${username}`, { withCredentials: true });
      setUserPosts(response.data);
    } catch (error) {
      console.error("Error:", error.message);
    }
  }

  const handleButtonChange = (button) => {
    setActiveButton(button);
    if (button === 'media') {
      const mediaUserPosts = userPosts.filter(post => post.media);
      setUserMediaPosts(mediaUserPosts);
    }
  }

  const sendMessage = async (recipientId) => {
    try {
      const response = await axios.post(`${apiUrl}/api/messages/conversation/`, { recipientId }, { withCredentials: true });
      const conversation = response.data.conversation;
      if (!conversation) {
        return
      }
      if (conversation && conversation._id) {
        navigate('/mensajes', { state: { conversation } });
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <main className="main">
      {loading
        ? <Loader />
        : (!user
          ? <p className={Styles.no_user}>Usuario no encontrado</p>
          : <>
            <div className={Styles.user_profile}>
              <div>
                <img src={userImage} alt="" className={Styles.user_img} />
              </div>
              <p>
                {user ? user.name : "Nombre de usuario"}
              </p>
              <p>
                {user ? `@${user.username}` : "@usuario"}
              </p>
              {
                currentUser.username !== user.username && (
                  <div className={Styles.button_container}>
                    <Button
                      text={buttonText}
                      onClick={() => followUnfollow(user._id)}
                      variant={isFollowing ? 'secondary' : 'primary'}
                    />
                    <Button
                      text="Mensaje"
                      onClick={() => sendMessage(user._id)}
                      variant='secondary'
                    />
                  </div>
                )
              }
              <div className={Styles.follow_container}>
                <Button
                  text={
                    user
                      ? `${user.followers.length === 1
                        ? `${user.followers.length} seguidor`
                        : `${user.followers.length} seguidores`
                      }`
                      : "0 seguidores"
                  }
                  onClick={() => navigate(`/${username}/seguidores`)}
                  variant="alternative"
                />
                <Button
                  text={
                    user
                      ? `${user.following.length === 1
                        ? `${user.following.length} seguido`
                        : `${user.following.length} seguidos`
                      }`
                      : "0 seguidos"
                  }
                  onClick={() => navigate(`/${username}/seguidos`)}
                  variant="alternative"
                />
              </div>
            </div>
            <div className={Styles.user_filter}>
              <button
                className={`${Styles.button} ${activeButton === 'publications' ? Styles.active : ''}`} onClick={() => handleButtonChange('publications')}
              >
                Publicaciones
              </button>
              <button
                className={`${Styles.button} ${activeButton === 'media' ? Styles.active : ''}`} onClick={() => handleButtonChange('media')}
              >
                Multimedia
              </button>
            </div>
            {
              activeButton === 'publications' && (
                userPosts.map((post, index) => (
                  <PostItem key={index} post={post} />
                ))
              )
            }
            {
              activeButton === 'media' && (
                userMediaPosts.map((post, index) => (
                  <PostItem key={index} post={post} />
                ))
              )
            }
          </>
        )}
    </main>
  );
};

export default UserProfile;