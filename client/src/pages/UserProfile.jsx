import { useEffect, useState } from 'react';
import useGetUserProfile from '../hooks/useGetUserProfile';
import Loader from '../components/loader/Loader';
import Styles from './pages.module.css';
import useUserImage from '../hooks/useUserImage';
import Button from '../components/button/Button';
import axios from 'axios';
import Post from '../components/post/Post';


const UserProfile = () => {
  const { loading, user } = useGetUserProfile();
  const { userImage } = useUserImage(user);
  const [activeButton, setActiveButton] = useState('all');
  const [allPosts, setAllPosts] = useState([]);
  const [posts, setPosts] = useState([]);
  const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

  useEffect(() => {
    const fetchPosts = async () => {
      if (!user) {
        return;
      }
      try {
        const response = await axios.get(`${apiUrl}/api/posts/user/${user.username}`, { withCredentials: true });
        setAllPosts(response.data);
        setPosts(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchPosts();
  }, [user]);

  const handleAllPostsClick = () => {
    setActiveButton('all');
    setPosts(allPosts);
  };

  const handleMultimediaPostsClick = () => {
    setActiveButton('multimedia');
    const multimediaPosts = posts.filter(post => post.media);
    setPosts(multimediaPosts);
  };

  if (loading) {
    return (
      <main className="main">
        <Loader />
      </main>
    )
  }

  if (!user) {
    return <p>Usuario no encontrado</p>
  }

  return (
    <main className="main">
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
            onClick={() => console.log("click")}
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
            onClick={() => console.log("click")}
            variant="alternative"
          />
        </div>
      </div>
      <div className={Styles.user_filter}>
        <button
          className={`${Styles.button} ${activeButton === 'all' ? Styles.active : ''}`}
          onClick={handleAllPostsClick}
        >
          Publicaciones
        </button>
        <button
          className={`${Styles.button} ${activeButton === 'multimedia' ? Styles.active : ''}`}
          onClick={handleMultimediaPostsClick}
        >
          Multimedia
        </button>
      </div>
      <Post posts={posts} />
    </main>
  );
};

export default UserProfile;