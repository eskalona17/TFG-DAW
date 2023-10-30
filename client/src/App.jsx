import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './variables.css'
import SignUp from './pages/SignUp'

export default function App() {

  return <BrowserRouter>
     <Routes>
      <Route path='/sign-up' element={<SignUp />} />
     </Routes>
    </BrowserRouter>
  
}
