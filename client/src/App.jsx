import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './variables.css'
import './index.css'
import SignUp from './pages/SignUp'
import Home from './pages/Home'
import Layout from './components/layout/Layout'

export default function App () {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/sign-up' element={<SignUp />} />
        {/* <Route path='/login' element={<Login />} /> */}
        <Route path='/' element={<Layout />}>
          <Route path='/' element={<Home />} />
          {/* <Route path='/explora' element={<Explore />} /> */}
          {/* <Route path='/mensajes' element={<Messages />} /> */}
          {/* <Route path='/editar-perfil' element={<EditProfile />} /> */}
          {/* <Route path='/ajustes' element={<Settings />} /> */}
          {/* <Route path='/:username' element={<UserProfile />} /> */}
          {/* <Route path='/:username/post/:postId' element={<PostPage />} /> */}
        </Route>
      </Routes>
    </BrowserRouter>
  )

}