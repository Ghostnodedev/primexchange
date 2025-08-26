'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import './navbar.css'

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

  const closeMenu = () => {
    setIsOpen(false)
  }

  const links = [
    { label: 'Home', href: '/' },
    { label: 'Exchange', href: '/exchange' },
    { label: 'Contact', href: '/contact' },
    { label: 'Profile', href: '/profile' },
  ]

  return (
    <nav className="navbar navbar-expand-md bg-black border-bottom px-4 py-2">
      {/* Brand */}
      <Link href="/" className="navbar-brand text-white fw-bold">
        MyApp
      </Link>

      {/* Hamburger toggler */}
      <button
        className="navbar-toggler text-white border-white"
        type="button"
        onClick={toggleMenu}
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      {/* Desktop Menu */}
      <div className="collapse navbar-collapse justify-content-end d-none d-md-flex">
        <ul className="navbar-nav align-items-center gap-3">
          {links.map(({ label, href }) => (
            <li className="nav-item" key={label}>
              <Link href={href} className="nav-link text-white">
                {label}
              </Link>
            </li>
          ))}
        </ul>
        <button
          className="btn btn-purple ms-3"
          onClick={token ? handleLogout : handleLogin}
        >
          {token ? 'Logout' : 'Login'}
        </button>
      </div>

      {/* Mobile Slide-in Menu */}
      <div className={`mobile-slide-menu ${isOpen ? 'open' : ''}`}>
        <div className="d-flex justify-content-between align-items-center p-3 border-bottom">
          <span className="fw-bold text-white fs-5">MyApp</span>
          <button className="btn-close btn-close-white" onClick={toggleMenu}></button>
        </div>
        <ul className="nav flex-column p-3">
          {links.map(({ label, href }) => (
            <li className="nav-item" key={label}>
              <Link
                href={href}
                className="nav-link text-white"
                onClick={closeMenu}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>
        <div className="px-3 pb-3">
          <button
            className="btn btn-purple w-100"
            onClick={() => {
              token ? handleLogout() : handleLogin()
              setIsOpen(false)
            }}
          >
            {token ? 'Logout' : 'Login'}
          </button>
        </div>
      </div>

      {/* Overlay */}
      {isOpen && <div className="mobile-overlay" onClick={toggleMenu}></div>}
    </nav>
  )
}

export default Navbar
