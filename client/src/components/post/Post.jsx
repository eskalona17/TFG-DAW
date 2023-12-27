import { PostContext } from '../../context/PostContext';
import { useContext } from "react";

import Styles from "./post.module.css";
import Loader from "../loader/Loader";
import PostItem from "../postItem/PostItem";

const Post = () => {
  const { loading, filteredPosts, userPosts } = useContext(PostContext);

  const {
    post
  } = Styles;

  return (
    <div className={post}>
      {loading ? (
        <Loader />
      ) : (
        <>
          {
            filteredPosts.length === 0 || userPosts.length === 0 && (
              <section className={Styles.noPosts}>
                <p>No hay publicaciones, empieza a seguir a otros usuarios para ver sus publicaciones</p>
              </section>
            )
          }
          {/* {
            filteredPosts && filteredPosts.map((post) => (
              <PostItem key={post._id} post={post} />
            ))
          } */}
          {
            userPosts && userPosts.map((post) => (
              <PostItem key={post._id} post={post} />
            ))
          }
        </>
      )}
    </div>
  );
};

export default Post;