import NewPost from '../components/newPost/NewPost';
import SearchFilter from '../components/searchFilter/searchFilter';
import Post from '../components/post/Post';
import { useState, useEffect } from 'react';

function Home() {

  const [currentPage, setCurrentPage] = useState(1);

  return (
    <main className="main">
      <NewPost />
      <SearchFilter />
      <Post currentPage={currentPage}/>
    </main>
  )
}

export default Home