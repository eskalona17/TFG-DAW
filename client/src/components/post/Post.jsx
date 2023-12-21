import { useState, useEffect, useContext } from "react";
import Styles from "./post.module.css";
import {
  VscStarEmpty,
  VscStarFull,
  VscComment,
  VscSend,
} from "react-icons/vsc";
import usePosts from "./../../hooks/getPost";
import { AuthContext } from "../../context/authContext";
import axios from "axios";

const Post = ({ activeFilter }) => {
  const { currentUser } = useContext(AuthContext);
  const { loading, posts } = usePosts(activeFilter);

  const [showComments, setShowComments] = useState(false);
  const [comment, setComment] = useState("");
  const [postComments, setPostComments] = useState({});
  const [favoritedPosts, setFavoritedPosts] = useState([]);
  
  const serverImagePath =
    import.meta.env.VITE_REACT_APP_API_URL + "/public/profilePic";

    useEffect(() => {
      if (!loading && posts.length > 0) {
        const commentsObj = {};
        const favoritedPostsArray = [];
    
        posts.forEach((post) => {
          // Verificar si ya existe la clave en commentsObj
          if (!commentsObj.hasOwnProperty(post._id)) {
            commentsObj[post._id] = post.replies;
          }
    
          // Verificar si ya existe la clave en favoritedPostsArray
          const existingFavoritedPost = favoritedPostsArray.find(
            (favPost) => favPost.postId === post._id
          );
    
          if (!existingFavoritedPost) {
            favoritedPostsArray.push({
              postId: post._id,
              isFavorited: post.favorites.includes(currentUser._id),
              favoritesLength: post.favorites.length,
            });
          }
        });
    
        console.log("Posts updated:", posts);
        setPostComments(commentsObj);
        setFavoritedPosts(favoritedPostsArray);
      }
    }, [currentUser._id, loading, posts, activeFilter]);
    

  // const handleFavoriteClick = async (postId) => {
  //   try {
  //     const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;
  //     const response = await axios.post(
  //       `${apiUrl}/api/posts/fav/${postId}`,
  //       {
  //         userId: currentUser._id,
  //       },
  //       {
  //         withCredentials: true,
  //       }
  //     );
  //     console.log("Respuesta de la solicitud:", response.data);
  //     setFavoritedPosts((prevFavoritedPosts) =>
  //       prevFavoritedPosts.map((item) => {
  //         if (item.postId === postId) {
  //           return {
  //             ...item,
  //             isFavorited: !item.isFavorited,
  //             favoritesLength: item.isFavorited
  //               ? item.favoritesLength - 1
  //               : item.favoritesLength + 1,
  //           };
  //         }
  //         return item;
  //       })
  //     );
  //   } catch (error) {
  //     console.error("error al actualizar fav: ", error.message);
  //   }
  // };

  // const handleCommentClick = (postId) => {
  //   setShowComments((prevShowComments) => ({
  //     ...prevShowComments,
  //     [postId]: !prevShowComments[postId],
  //   }));
  // };

  // const handleCommentSubmit = async (postId) => {
  //   try {
  //     const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;
  //     const response = await axios.post(
  //       `${apiUrl}/api/posts/reply/${postId}`,
  //       {
  //         text: comment,
  //         userId: currentUser._id,
  //         userProfilePic: currentUser.profilePic,
  //         username: currentUser.username,
  //       },
  //       { withCredentials: true }
  //     );

  //     setPostComments((prevComments) => ({
  //       ...prevComments,
  //       [postId]: [
  //         ...(prevComments[postId] || []),
  //         response.data.post.replies.pop(),
  //       ],
  //     }));

  //     setComment("");
  //   } catch (error) {
  //     console.error("Error al enviar la respuesta: ", error.message);
  //   }
  // };

  const {
    post,
    post_container_user,
    user_img,
    user_name,
    user_info,
    user_publictime,
    post_container,
    post_container_individual,
    post_content,
    multimedia,
    multimedia_item,
    likes_container,
    likes,
    comments,
    comments_container,
    comment_user_img_container,
    comment_user_img,
    comment_container,
    comments_text_container,
    comment_user_info,
    comment_user_name,
    comment_text,
    comment_input,
    comment_submit,
    reply_container,
  } = Styles;

  const orange_color = "#ffa07a";

  return (
    <div className={`${post} ${post_container}`}>
      {loading ? (
        <p>Cargando...</p>
      ) : (
        posts.map((post) => (
          <div key={post._id} className={post_container_individual}>
            <div className={post_container_user}>
              {/* Información del usuario */}
              <img
                src={`${serverImagePath}/${post.authorData.profilePic}`}
                alt=""
                className={user_img}
              />
              <div className={user_info}>
                <p className={user_name}>{post.authorData.username}</p>
                {/* Adaptar según la fecha real en tu objeto post */}
                <p className={user_publictime}>
                  {formatTimestamp(post.createdAt)}
                </p>
              </div>
            </div>
            {/* Contenido del post */}
            {/* <p className={post_content}>{post.content}</p> */}
            {/* Multimedia*/}
            {/* {post.media && (
              <div className={multimedia}>
                <img src={post.media} alt="" className={multimedia_item} />
              </div>
            )} */}
            {/* Likes y comentarios */}
            {/* <div className={likes_container}>
              <span
                className={likes}
                onClick={() => handleFavoriteClick(post._id)}
              >
                {favoritedPosts.find((item) => item.postId === post._id)
                  ?.isFavorited ? (
                  <VscStarFull color={orange_color} />
                ) : (
                  <VscStarEmpty color={orange_color} />
                )}
                {favoritedPosts.find((item) => item.postId === post._id)
                  ?.favoritesLength || 0}{" "}
                favoritos{" "}
              </span>
              <span
                className={comments}
                onClick={() => handleCommentClick(post._id)}
              >
                <VscComment color={orange_color} />
                {postComments[post._id]?.length || 0} comentarios
              </span>
            </div> */}
            {/* Mostrar comentarios */}
            {/* {showComments[post._id] && (
              <div className={comments_container}> */}
                {/* Mapear comentarios desde el objeto post */}
                {/* {postComments[post._id]?.map((comment, index) => (
                  <div key={index} className={Styles.comment}>
                    <div className={comment_user_img_container}>
                      <img
                        src={`${serverImagePath}/${comment.userProfilePic}`}
                        alt=""
                        className={comment_user_img}
                      />
                    </div>
                    <div className={comment_container}>
                      <div className={comment_user_info}>
                        <p className={comment_user_name}>{comment.username}</p>
                      </div>
                      <div className={comments_text_container}>
                        <p className={comment_text}>{comment.text}</p>
                      </div>
                    </div>
                  </div>
                ))} */}
                {/* Entrada de comentario */}
                {/* <div className={reply_container}>
                  <input
                    type="text"
                    placeholder="Escribe aquí..."
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className={comment_input}
                  />
                  <button
                    onClick={() => handleCommentSubmit(post._id)}
                    className={comment_submit}
                  >
                    <VscSend color={orange_color} />
                  </button>
                </div> */}
              {/* </div>
            )} */}
          </div>
        ))
      )}
    </div>
  );
};

const formatTimestamp = (timestamp) => {
  const createdAt = new Date(timestamp);
  const now = new Date();
  const elapsedMilliseconds = now - createdAt;
  const seconds = Math.floor(elapsedMilliseconds / 1000);

  if (seconds < 60) {
    return `Publicado hace ${seconds} segundo${seconds !== 1 ? "s" : ""}`;
  }

  const minutes = Math.floor(seconds / 60);

  if (minutes < 60) {
    return `Publicado hace ${minutes} minuto${minutes !== 1 ? "s" : ""}`;
  }

  const hours = Math.floor(minutes / 60);

  if (hours < 24) {
    return `Publicado hace ${hours} hora${hours !== 1 ? "s" : ""}`;
  }

  // Si han pasado más de 24 horas, mostrar la fecha y hora completas
  const formattedTimestamp = createdAt.toLocaleString(); // Muestra la fecha y hora completas
  return `Publicado el ${formattedTimestamp}`;
};

export default Post;
