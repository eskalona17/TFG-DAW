import useGetUserProfile from '../../hooks/getUserProfile';
import Loader from '../loader/Loader';
import Styles from './userProfile.module.css';

const UserProfile = () => {
  const { loading, user } = useGetUserProfile();

  if (loading) {
    return <Loader />
  }

  if (!user) {
    return <p>Usuario no encontrado</p>
  }

  return (
    <div>
      <h1>{user.name}</h1>
      <p>{user.username}</p>
      {/* Muestra más información del usuario aquí */}
    </div>
  );
};

export default UserProfile;