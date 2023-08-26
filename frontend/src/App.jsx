import { useState, Suspense, lazy } from 'react'
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from './components/pages/Home'
import About from './components/pages/About'
import Login from './components/pages/Login'
import Register from './components/pages/Register'
import Dashboard from './components/pages/Dashboard'
import Navigationbar from './components/ui/Navigationbar'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div id="body">
      <Navigationbar />
      <main id="content">
        <BrowserRouter>
          <Suspense fallback="Loading...">
            <Routes>
              <Route path="/" element={<Home />}></Route>
              <Route path="about" element={<About />}></Route>
              <Route path="login" element={<Login />}></Route>
              <Route path="register" element={<Register />}></Route>
              <Route path="dashboard" element={<Dashboard />}></Route>
            </Routes>
          </Suspense>
        </BrowserRouter>
      </main>
    </div>
  )
}

export default App
