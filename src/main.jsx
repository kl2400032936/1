import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'   /* Route path='/',here slash means welcome page*/
import Login from './login.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <Routes>
   <Route path='/' element={<Login/>} />  
  </Routes>
  </BrowserRouter>
)