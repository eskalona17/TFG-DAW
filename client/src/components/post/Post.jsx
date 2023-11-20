import Styles from "./post.module.css";

const Post = () => {
  const {
    post,
    post_container_user,
    user_img,
    user_info,
    user_name,
    user_publictime,
    post_container,
    post_content,
    multimedia,
    multimedia_item,
    likes_container,
    likes,
    coments,
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
          <img
            src="../../../media-1234.png"
            alt=""
            className={multimedia_item}
          />
        </div>
      </div>
      <div className={likes_container}>
        <span className={likes}>1 favorito</span>
        <span className={coments}>2 comentarios</span>
      </div>
    </div>
  );
};

export default Post;
