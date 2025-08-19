"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation"; // ✅ Import router

export default function Navbar() {
  const [showNavbar, setShowNavbar] = useState(true);
  const [token, setToken] = useState(null);
  const router = useRouter(); // ✅ Initialize router

  useEffect(() => {
    const storedToken = localStorage.getItem("authToken");
    setToken(storedToken);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setShowNavbar(window.scrollY === 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    setToken(null);
    router.push("/login"); // ✅ Redirect to login
  };

  return (
    <nav
      className="navbar navbar-expand-lg fixed-top bg-transparent px-3"
      style={{
        top: showNavbar ? "0" : "-80px",
        transition: "top 0.3s ease-in-out",
        zIndex: 10,
      }}
    >
      <div className="container-fluid">
        <img
          src="/images-removebg-preview.png"
          alt="Logo"
          className="navbar-brand"
          style={{ height: "100px" }}
        />
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
          <ul className="navbar-nav align-items-center gap-lg-4">
            <li className="nav-item">
              <a className="nav-link text-white" href="/home">Home</a>
            </li>
            <li className="nav-item">
              <a className="nav-link text-white" href="/account">Account</a>
            </li>
            <li className="nav-item">
              <a className="nav-link text-white" href="/exchange">Exchange</a>
            </li>

            {token ? (
              <li className="nav-item">
                <button onClick={handleLogout} className="btn btn-outline-light ms-lg-3">
                  Logout
                </button>
              </li>
            ) : (
              <li className="nav-item">
                <a href="/login" className="btn btn-outline-light ms-lg-3">
                  Login
                </a>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
