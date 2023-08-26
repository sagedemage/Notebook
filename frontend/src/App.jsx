import { useState, Suspense, lazy } from 'react'
import { BrowserRouter, Route, Routes } from "react-router-dom"

/* UI Components */
import NavigationBar from './components/ui/NavigationBar'

/* Page Components */
import Home from './components/pages/Home'
import About from './components/pages/About'
import Login from './components/pages/Login'
import Register from './components/pages/Register'
import Dashboard from './components/pages/Dashboard'
import PageNotFound from './components/pages/PageNotFound'

import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div id="body">
      <NavigationBar />
      <main id="content">
        <BrowserRouter>
          <Suspense fallback="Loading...">
            <Routes>
              <Route path="/" element={<Home />}></Route>
              <Route path="about" element={<About />}></Route>
              <Route path="login" element={<Login />}></Route>
              <Route path="register" element={<Register />}></Route>
              <Route path="dashboard" element={<Dashboard />}></Route>
              <Route path="*" element={<PageNotFound />}></Route>
            </Routes>
          </Suspense>
        </BrowserRouter>
      </main>
    </div>
  )
}

export default App
