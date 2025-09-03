'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
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

  // Add profile link ONLY if logged in
  const links = [
    { label: 'Home', href: '/' },
    { label: 'Exchange', href: '/exchange' },
    { label: 'Mine', href: '/mine' },
    ...(token ? [{ label: 'Profile', href: '/profile' }] : []), // Conditional Profile link
    { label: 'Contact', href: '/contact' },
  ]

  return (
    <nav className="navbar navbar-expand-md border-bottom px-4 py-2 " style = {{background : "#0D1B2A"}} >
      {/* Brand Logo */}
      <Link href="/" className="navbar-brand d-flex align-items-center">
        <Image
          src="/Prime_Xchange__1_-removebg-preview.png"
          alt="Logo"
          width={100}
          height={90}
          className="d-inline-block align-text-top"
        />
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
          <Image
            src="/logo.png"
            alt="Logo"
            width={120}
            height={30}
          />
          <button
            className="btn-close btn-close-white"
            onClick={toggleMenu}
          ></button>
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
