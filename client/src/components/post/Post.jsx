import { useState } from "react";
import Styles from "./post.module.css";
import url_image from "../../assets/img/media-1234.png";

const Post = () => {
  const [showComments, setShowComments] = useState(false);
  const [comment, setComment] = useState("");
  const [commentsList, setCommentsList] = useState([
    { user: "Usuario Ejemplo", text: "Este es un comentario de ejemplo 1." },
  ]);

  const handleCommentClick = () => {
    setShowComments(!showComments);
  };
  const handleCommentSubmit = () => {
    setCommentsList([
      ...commentsList,
      { user: "Nombre de usuario", text: comment },
    ]);
    setComment("");
  };

  const {
    post,
    post_container_user,
    user_img,
    user_name,
    user_info,
    user_publictime,
    post_container,
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
    comment_user_publictime,
    comments_text_container,
    comment_user_info,
    comment_user_name,
    comment_text,
    comment_input,
    comment_submit,
    reply_container,
  } = Styles;

  return (
    <div className={post}>
      <div className={post_container_user}>
        <img src="" alt="" className={user_img} />
        <div className={user_info}>
          <p className={user_name}>Nombre usuario</p>
          <p className={user_publictime}>Hace 2 minutos</p>
        </div>
      </div>
      <div className={post_container}>
        <p className={post_content}>Esto es una prueba de contenido</p>
        <div className={multimedia}>
          <img src={url_image} alt="" className={multimedia_item} />
        </div>
      </div>
      <div className={likes_container}>
        <span className={likes}>1 favorito</span>
        <span className={comments} onClick={handleCommentClick}>
          2 comentarios
        </span>
      </div>
      {showComments && (
        <div className={comments_container}>
          {commentsList.map((comment, index) => (
            <div key={index} className={comment}>
              <div className={comment_user_img_container}>
                <img src={url_image} alt="" className={comment_user_img} />
              </div>
              <div className={comment_container}>
                <div className={comment_user_info}>
                  <p className={comment_user_name}>{comment.user}</p>
                  <p className={comment_user_publictime}>hace 16s</p>
                </div>

                <div className={comments_text_container}>
                  <p className={comment_text}>{comment.text}</p>
                </div>
              </div>
            </div>
          ))}
          <div className={reply_container}>
            <input
              type="text"
              placeholder="Escribe aquí..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className={comment_input}
            />
            <button onClick={handleCommentSubmit} className={comment_submit}>
              Enviar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Post;
