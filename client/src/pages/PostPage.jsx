import { useEffect, useState } from 'react';
import Styles from './pages.module.css'
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Loader from '../components/loader/Loader';

const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;
import PostItem from '../components/postItem/PostItem';

const PostPage = () => {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(`${apiUrl}/api/posts/${postId}`, { withCredentials: true });
        setPost(response.data.post);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [postId]);

  return (
    <main className="main">
      {loading && (
        <Loader />
      )}
      {post && (
        <PostItem post={post} key={post._id} active={true} />
      )}
      {!post && !loading && (
        <p>La publicación no existe o ha sido eliminada</p>
      )}
    </main>
  )
}

export default PostPage