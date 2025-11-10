import './App.css';
import Home from './Pages/Home.jsx'
import Login from './Pages/Login.jsx'
import Signup from './Pages/Signup.jsx'
import CreateJob from './Pages/CreateJob.jsx'
import { BrowserRouter, Routes, Route } from "react-router-dom"


function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/jobs/create' element={<CreateJob />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
