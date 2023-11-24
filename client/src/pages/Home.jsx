import NewPost from '../components/newPost/NewPost';
import SearchFilter from '../components/searchFilter/searchFilter';
import Post from '../components/post/Post';
function Home() {
  return (
    <main className="main">
      <NewPost />
      <SearchFilter />
      <Post/>
    </main>
  )
}

export default Home