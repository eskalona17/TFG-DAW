import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './variables.css'
import SignUp from './pages/SignUp'
import Home from './pages/Home'

export default function App() {

  return <BrowserRouter>
     <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/sign-up' element={<SignUp />} />
     </Routes>
    </BrowserRouter>
  
}
