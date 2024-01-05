import { useContext, useState, useEffect } from "react";
import Styles from "./post.module.css";
import Loader from "../loader/Loader";
import PostItem from "../postItem/PostItem";
import { PostContext } from '../../context/PostContext';

const Post = () => {
  const { loading, currentFilter, feedPosts, filteredPostsByFilter } = useContext(PostContext);
  const [visiblePosts, setVisiblePosts] = useState(5); // Número de publicaciones a mostrar inicialmente
  const [isFetching, setIsFetching] = useState(false);

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop ===
      document.documentElement.offsetHeight
    ) {
      // El usuario ha llegado al final de la página
      setIsFetching(true);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []); 

  useEffect(() => {
    const fetchMorePosts = () => {
      
      setTimeout(() => {
        setVisiblePosts((prevVisiblePosts) => prevVisiblePosts + 5);
        setIsFetching(false);
      }, 1000);
    };

    if (isFetching) {
      fetchMorePosts();
    }
  }, [isFetching]);

  const postsToDisplay = currentFilter === 'all' ? feedPosts : filteredPostsByFilter;

  return (
    <div className={Styles.post}>
      {loading ? (
        <Loader />
      ) : (
        <>
          {postsToDisplay.length > 0 ? (
            postsToDisplay.slice(0, visiblePosts).map((post) => (
              <PostItem key={post._id} post={post} />
            ))
          ) : (
            <section className={Styles.noPosts}>
              {currentFilter === 'all' ? (
                <p>No hay publicaciones</p>
              ) : (
                <p>No hay publicaciones con este perfil</p>
              )}
            </section>
          )}
          {isFetching && <Loader />} {/* Muestra el loader mientras se obtienen más publicaciones */}
        </>
      )}
    </div>
  );
};

export default Post;
