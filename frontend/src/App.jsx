import { useState, Suspense, lazy } from 'react'
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from './components/pages/Home'
import About from './components/pages/About'
//import reactLogo from './assets/react.svg'
//import viteLogo from '/vite.svg'
//import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <ul>
        <li><a href="/">Home</a></li>
        <li><a href="/about">About</a></li>
      </ul>
      <BrowserRouter>
        <Suspense fallback="Loading...">
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="about" element={<About />}></Route>
          </Routes>
        </Suspense>
      </BrowserRouter>
    </div>
  )
}

export default App
