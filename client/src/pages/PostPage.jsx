import PostItem from '@/components/postItem/PostItem';
import Loader from '@/components/loader/Loader';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

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