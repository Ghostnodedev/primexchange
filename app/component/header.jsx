"use client";

import { useEffect, useState } from "react";

export default function Navbar() {
  const [showNavbar, setShowNavbar] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY === 0) {
        setShowNavbar(true); // show only at top
      } else {
        setShowNavbar(false); // hide once you scroll down
      }
    };

    window.addEventListener("scroll", handleScroll);

    // Cleanup
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
          src="/Prime_Xchange-removebg-preview.png"
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
        <div
          className="collapse navbar-collapse justify-content-end"
          id="navbarNav"
        >
          <ul className="navbar-nav align-items-center gap-lg-4">
            <li className="nav-item">
              <a className="nav-link text-white" href="/home">
                Home
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link text-white" href="/account">
                Account
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link text-white" href="/exchage">
                exchage
              </a>
            </li>
            <li className="nav-item">
              <button className="btn btn-outline-light ms-lg-3">Login</button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
