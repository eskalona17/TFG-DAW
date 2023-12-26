import { PostContext } from '../../context/PostContext';
import { useContext } from "react";

import Styles from "./post.module.css";
import Loader from "../loader/Loader";
import PostItem from "../postItem/PostItem";

const Post = () => {
  const { loading, filteredPosts } = useContext(PostContext);

  const {
    post
  } = Styles;

  return (
    <div className={post}>
      {loading ? (
        <Loader />
      ) : (
        filteredPosts.map((post) => (
          <PostItem key={post._id} post={post} />
        ))
      )}
    </div>
  );
};

export default Post;