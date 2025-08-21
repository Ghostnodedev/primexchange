'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

const Navbar = () => {
  const router = useRouter()
  const [token, setToken] = useState('')
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const storedToken = localStorage.getItem('authToken')
    setToken(storedToken || '')
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('authToken')
    setToken('')
    router.push('/login')
  }

  const handleLogin = () => {
    router.push('/login')
  }

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  return (
    <nav className="navbar navbar-expand-lg bg-black px-4 border-bottom">
      <a className="navbar-brand text-white fw-bold" href="#">
        MyApp
      </a>

      <button
        className="navbar-toggler"
        type="button"
        onClick={toggleMenu}
        aria-controls="navbarNav"
        aria-expanded={isOpen}
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className={`collapse navbar-collapse text-black justify-content-end ${isOpen ? 'show' : ''}`} id="navbarNav">
        <ul className="navbar-nav d-flex align-items-center gap-2 me-3 mb-2 mb-lg-0">
          {['Home', 'exchange', 'contact', 'profile'].map((label) => (
            <li className="nav-item" key={label}>
              <a className="nav-link text-black text-white" href={`/${label.toLowerCase()}`}>
                {label === 'Home' ? 'Home' : label}   
              </a>
            </li>
          ))}
        </ul>

        <button
          className="btn"
          onClick={token ? handleLogout : handleLogin}
          style={{ backgroundColor: 'purple', color: 'white' }}
        >
          {token ? 'Logout' : 'Login'}
        </button>
      </div>
    </nav>
  )
}

export default Navbar
