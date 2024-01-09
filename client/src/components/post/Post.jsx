import { useContext, useState, useEffect, useRef } from "react";
import Styles from "./post.module.css";
import Loader from "../loader/Loader";
import PostItem from "../postItem/PostItem";
import { PostContext } from "../../context/PostContext";

const Post = () => {
  const { loading, currentFilter, feedPosts, filteredPostsByFilter } =
    useContext(PostContext);
  const [visiblePosts, setVisiblePosts] = useState(5);
  const [isFetching, setIsFetching] = useState(false);
  const loader = useRef(null);

  const postsToDisplay =
    currentFilter === "all" ? feedPosts : filteredPostsByFilter;

  useEffect(() => {
    var options = {
      root: null,
      rootMargin: "20px",
      threshold: 1.0
    };

    const observer = new IntersectionObserver(handleObserver, options);

    if (loader.current) {
      observer.observe(loader.current);
    }

    // Cuando se desmonta el componente o cambia postsToDisplay, desconectamos el observador
    return () => {
      if (loader.current) {
        observer.unobserve(loader.current);
      }
    };
  }, [postsToDisplay]);

  const handleObserver = (entities) => {
    const target = entities[0];
    if (target.isIntersecting) {   
      setIsFetching(true);
      setTimeout(() => {
        setVisiblePosts((prev) => prev + 5);
        setIsFetching(false);
      }, 1000);
    }
  }

  return (
    <div className={Styles.post}>
      {loading ? (
        <Loader />
      ) : (
        <>
          {postsToDisplay.length > 0 ? (
            postsToDisplay
              .slice(0, visiblePosts)
              .map((post) => (
                <PostItem key={post._id} post={post} />
              ))
          ) : (
            <section className={Styles.noPosts}>
              {currentFilter === "all" ? (
                <p>No hay posts para mostrar</p>
              ) : (
                <p>No hay posts para mostrar en la categoría {currentFilter}</p>
              )}
            </section>
          )}
          <div ref={loader}></div>
          {isFetching && <Loader />}
        </>
      )}
    </div>
  );
};

export default Post;