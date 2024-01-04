import { PostContext } from '../../context/PostContext';
import { useContext } from "react";

import Styles from "./post.module.css";
import Loader from "../loader/Loader";
import PostItem from "../postItem/PostItem";

const Post = () => {
  const { loading, currentFilter, feedPosts, filteredPostsByFilter } = useContext(PostContext);


  return (
    <div className={Styles.post}>
      {loading ? (
        <Loader />
      ) : (
        <>
        {
          currentFilter === 'all' ? (
            feedPosts.length > 0 ? (
              feedPosts.map((post, index) => (
                <PostItem key={index} post={post} />
              ))
            ) : (
              <section className={Styles.noPosts}>
                <p>No hay publicaciones</p>
              </section>
            )
          ) : null
        }
        {
          currentFilter === 'personal' ? (
            filteredPostsByFilter.length > 0 ? (
              filteredPostsByFilter.map((post, index) => (
                <PostItem key={index} post={post} />
              ))
            ) : (
              <section className={Styles.noPosts}>
                <p>No hay publicaciones con este perfil</p>
              </section>
            )
          ) : null
        }
        {
          currentFilter === 'profesional' ? (
            filteredPostsByFilter.length > 0 ? (
              filteredPostsByFilter.map((post, index) => (
                <PostItem key={index} post={post} />
              ))
            ) : (
              <section className={Styles.noPosts}>
                <p>No hay publicaciones con este perfil</p>
              </section>
            )
          ) : null
        }
      </>
      )}
    </div>
  );
};

export default Post;