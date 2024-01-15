import SearchFilter from '@/components/searchFilter/searchFilter';
import NewPost from '@/components/newPost/NewPost';
import Post from '@/components/post/Post';
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