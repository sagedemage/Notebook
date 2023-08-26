import { useState, Suspense, lazy } from 'react'
import { BrowserRouter, Route, Routes } from "react-router-dom"

/* UI Components */
const NavigationBar = lazy(() => import('./components/ui/NavigationBar'))

/* Page Components */
const Home = lazy(() => import('./components/pages/Home'))
const About = lazy(() => import('./components/pages/About'))
const Login = lazy(() => import('./components/pages/Login'))
const Register = lazy(() => import('./components/pages/Register'))
const Dashboard = lazy(() => import('./components/pages/Dashboard'))
const PageNotFound = lazy(() => import('./components/pages/PageNotFound'))

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
