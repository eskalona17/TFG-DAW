import NewPost from '../components/newPost/NewPost'
import Post from '../components/Post/Post'

function Home() {
  return (
    <main className="main">
      <NewPost />
      <Post/>
    </main>
  )
}

export default Home