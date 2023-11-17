import Styles from "./post.module.css"

const Post = () => {
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
            <img src="../../../media-1234.png" alt="" className={Styles.multimedia_item} />
           
          </div>
        </div>
        <div className={Styles.likes_container}>
            <span className={Styles.likes}>1 favorito</span>
            <span className={Styles.coments}>2 comentarios</span>
        </div>
      </div>
    );
  };
  
  export default Post;