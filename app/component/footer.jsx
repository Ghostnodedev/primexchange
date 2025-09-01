'use client';

import Link from "next/link";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";

const Footer = () => {
  return (
    <footer
      style={{
        background: "linear-gradient(135deg, #1e1e2f, #111)",
        color: "#fff",
        padding: "3rem 1rem",
        textAlign: "center",
        boxShadow: "0 -4px 20px rgba(0,0,0,0.4)",
      }}
    >

      {/* Navigation Links */}
      <ul
        style={{
          listStyle: "none",
          padding: 0,
          margin: "0 auto 2rem",
          maxWidth: "700px",
          display: "flex",
          justifyContent: "center",
          gap: "2rem",
          flexWrap: "wrap",
        }}
      >
        <li>
          <Link href="/" style={linkStyle}>
            Home
          </Link>
        </li>
        <li>
          <Link href="/contact" style={linkStyle}>
            Contact
          </Link>
        </li>
        <li>
          <Link href="/account" style={linkStyle}>
            Account
          </Link>
        </li>
        <li>
          <Link href="/exchange" style={linkStyle}>
            Exchange
          </Link>
        </li>
      </ul>

      {/* Social Media Icons */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "1.2rem",
          marginBottom: "2rem",
        }}
      >
        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" style={iconStyle}>
          <FaFacebookF />
        </a>
        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" style={iconStyle}>
          <FaTwitter />
        </a>
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" style={iconStyle}>
          <FaInstagram />
        </a>
        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" style={iconStyle}>
          <FaLinkedinIn />
        </a>
      </div>

      {/* Copyright */}
      <p style={{ fontSize: "0.9rem", color: "#aaa" }}>
        &copy; {new Date().getFullYear()} MyApp. All rights reserved.
      </p>
    </footer>
  );
};

// Shared Styles
const linkStyle = {
  color: "#ddd",
  textDecoration: "none",
  fontWeight: "600",
  fontSize: "1rem",
  transition: "color 0.3s",
};

const iconStyle = {
  color: "#fff",
  fontSize: "1.2rem",
  background: "rgba(255,255,255,0.1)",
  padding: "10px",
  borderRadius: "50%",
  transition: "all 0.3s",
};

export default Footer;
