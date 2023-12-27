import { VscStarEmpty, VscStarFull, VscComment } from "react-icons/vsc";
import { AuthContext } from "../../context/AuthContext";
import useUserImage from "../../hooks/useUserImage";
import { useContext, useState } from "react";
import Styles from "./postItem.module.css";
import Input from "../input/Input";
import axios from "axios";
import ReplyItem from "../replyItem/ReplyItem";
import LabelProfesional from "../labelProfesional/LabelProfesional";
import { useNavigate } from "react-router-dom";

const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

const PostItem = ({ post }) => {
  const { currentUser } = useContext(AuthContext);
  const { userImage } = useUserImage(post.author, '75');
  const [isFavorited, setIsFavorited] = useState(post.favorites.includes(currentUser._id));
  const [favoritesCount, setFavoritesCount] = useState(post.favorites.length);
  const [showComments, setShowComments] = useState(false);
  const [replies, setReplies] = useState(post.replies);
  const [repliesCount, setRepliesCount] = useState(post.replies.length);
  const [comment, setComment] = useState("");
  const serverMediaPath = apiUrl + '/public/media';
  const navigate = useNavigate();
  const orange_color = "#ffa07a";

  const {
    post_container_user,
    user_img,
    user_name,
    user_info,
    user_publictime,
    post_container_individual,
    post_content,
    multimedia,
    multimedia_item,
    likes_container,
    likes,
    comments,
    comments_container,
  } = Styles;

  const handleFavoriteClick = async (postId) => {
    try {
      const response = await axios.post(`${apiUrl}/api/posts/fav/${postId}`, {}, { withCredentials: true });
      if (response.status === 200) {
        setIsFavorited(response.data.isFavorited);
        setFavoritesCount(response.data.favoritesCount);
      }
    } catch (error) {
      console.error('error al actualizar fav: ', error.message)
    }
  };

  const handleCommentClick = () => {
    setShowComments(prevShowComments => !prevShowComments);
  };

  const handleCommentSubmit = async (postId) => {
    try {
      const response = await axios.post(`${apiUrl}/api/posts/reply/${postId}`, { text: comment }, { withCredentials: true });
      setReplies(response.data.post.replies);
      setRepliesCount(response.data.post.replies.length);
    } catch (error) {
      console.error('Error al enviar la respuesta: ', error.message);
    } finally {
      setComment('');
    }
  };

  const formatTimestamp = (timestamp) => {
    const createdAt = new Date(timestamp);
    const now = new Date();
    const elapsedMilliseconds = now - createdAt;
    const seconds = Math.floor(elapsedMilliseconds / 1000);

    if (seconds < 60) {
      return `Hace ${seconds} segundo${seconds !== 1 ? 's' : ''}`;
    }

    const minutes = Math.floor(seconds / 60);

    if (minutes < 60) {
      return `Hace ${minutes} minuto${minutes !== 1 ? 's' : ''}`;
    }

    const hours = Math.floor(minutes / 60);

    if (hours < 24) {
      return `Hace ${hours} hora${hours !== 1 ? 's' : ''}`;
    }

    // Si han pasado más de 24 horas, mostrar la fecha y hora completas
    const meses = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
    const dia = createdAt.getDate();
    const mes = meses[createdAt.getMonth()];
    const horas = createdAt.getHours();
    const minutos = createdAt.getMinutes().toString().padStart(2, '0');

    // Formatea la fecha
    const formattedTimestamp = `${dia} de ${mes} a las ${horas}:${minutos}h`;

    return formattedTimestamp;
  };

  return (
    <div className={post_container_individual}>
      <div className={post_container_user}>
        {/* Información del usuario */}
        <img src={userImage} alt="" className={user_img} onClick={() => navigate(`/${post.author.username}`)} />
        <div className={user_info}>
          <p className={user_name} onClick={() => navigate(`/${post.author.username}`)} >{post.author.username}</p>
          {/* Adaptar según la fecha real en tu objeto post */}
          <p className={user_publictime}>{formatTimestamp(post.createdAt)}</p>
        </div>
        {post.author.profile === 'profesional' 
          ? <LabelProfesional />
          : null
        }
      </div>
      {/* Contenido del post */}
      <p className={post_content} onClick={() => navigate(`/${post.author.username}/post/${post._id}`)}>{post.content}</p>
      {/* Multimedia*/}
      {post.media && (
        <div className={multimedia} onClick={() => navigate(`/${post.author.username}/post/${post._id}`)}>
          <img src={`${serverMediaPath}/${post.media}`} alt="" className={multimedia_item} />
        </div>
      )}
      {/* Likes y comentarios */}
      <div className={likes_container}>
        <span className={likes} onClick={() => handleFavoriteClick(post._id)}>
          {isFavorited
            ? (<VscStarFull color={orange_color} />)
            : (<VscStarEmpty color={orange_color} />)}
          {favoritesCount} favoritos
        </span>
        <span className={comments} onClick={() => handleCommentClick()}>
          <VscComment color={orange_color} />
          {repliesCount} comentarios
        </span>
      </div>
      {/* Mostrar comentarios */}
      {showComments && (
        <div className={comments_container}>
          <div className={Styles.divider}></div>
          {/* Mapear comentarios desde el objeto post */}
          {replies.map((reply, index) => (
            <ReplyItem key={index} reply={reply} />
          ))}
          <Input
            type="text"
            placeholder="Escribe aquí..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            onClick={() => handleCommentSubmit(post._id)}
            className="newComment"
          />
        </div>
      )}
    </div>
  );
};

export default PostItem;