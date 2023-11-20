import {useState } from "react";
import Styles from "./post.module.css"

const Post = () => {
  const [showComments, setShowComments] = useState(false);
  const [comment, setComment] = useState('');
  const [commentsList, setCommentsList] = useState([
    { user: 'Usuario Ejemplo', text: 'Este es un comentario de ejemplo 1.' },
  ]);

  const handleCommentClick = () => {
    setShowComments(!showComments);
  };
  const handleCommentSubmit = () =>{

    setCommentsList([...commentsList, {user: 'Nombre de usuario', text: comment}])
    setComment('');
  };

    return (
      <div className={Styles.post}>
        <div className={Styles.post_container_user}>
          <img src="" alt="" className={Styles.user_img} />
            <div className={Styles.user_info}>
                <p className={Styles.user_name}>Nombre usuario</p>
                <p className={Styles.user_publictime}>Hace 2 minutos</p>
            </div>
        </div>
        <div className={Styles.post_container}>
          <p className={Styles.post_content}>Esto es una prueba de contenido</p>
          <div className={Styles.multimedia}>
            <img src="../src/assets/img/media-1234.png" alt="" className={Styles.multimedia_item} />
           
          </div>
        </div>
        <div className={Styles.likes_container}>
            <span className={Styles.likes}>1 favorito</span>
            <span className={Styles.comments} onClick={handleCommentClick}>2 comentarios</span>
        </div>
        {showComments && (
          <div className={Styles.comments_container}>
            {commentsList.map((comment, index) => (
              <div key={index} className={Styles.comment}>
                
                  <div className={Styles.comment_user_img_container}>
                    <img src="../src/assets/img/media-1234.png" alt="" className={Styles.comment_user_img} />
                  </div>
                  <div className={Styles.comment_container}>
                    <div className={Styles.comment_user_info}>
                      <p className={Styles.comment_user_name}>{comment.user}</p>
                      <p className={Styles.comment_user_publictime}>hace 16s</p>
                    </div>
                  
                    <div className={Styles.comments_text_container}>
                      <p className={Styles.comment_text}>{comment.text}</p>
                    </div>
                  </div>
              </div>
            ))}
            <div className={Styles.reply_container}>
              <input
                type="text"
                placeholder="Escribe aquí..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className={Styles.comment_input}
              />
              <button onClick={handleCommentSubmit} className={Styles.comment_submit}>
                Enviar
              </button>
            </div>
          </div>
        )}
      </div>
    );
  };
  
  export default Post;