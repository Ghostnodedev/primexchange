'use client';

import Link from "next/link";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";

const Footer = () => {
  return (
    <footer
      style={{
        background: "linear-gradient(135deg, #0f1624, #1a2638)",
        color: "#f0f4f8",
        padding: "4rem 1rem 3rem",
        textAlign: "center",
        boxShadow: "0 -6px 30px rgba(0, 0, 0, 0.7)",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      }}
    >
      {/* Navigation Links */}
      <ul
        style={{
          listStyle: "none",
          padding: 0,
          margin: "0 auto 2.5rem",
          maxWidth: "720px",
          display: "flex",
          justifyContent: "center",
          gap: "2.8rem",
          flexWrap: "wrap",
          fontWeight: "600",
          fontSize: "1.1rem",
          letterSpacing: "0.04em",
        }}
      >
        {["Home", "Contact", "Account", "Exchange"].map((label) => (
          <li key={label}>
            <Link href={`/${label.toLowerCase() === 'home' ? '' : label.toLowerCase()}`} style={linkStyle}>
              {label}
            </Link>
          </li>
        ))}
      </ul>

      {/* Social Media Icons */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "1.8rem",
          marginBottom: "3rem",
        }}
      >
        {[{
          icon: <FaFacebookF />, url: "https://facebook.com"
        }, {
          icon: <FaTwitter />, url: "https://twitter.com"
        }, {
          icon: <FaInstagram />, url: "https://instagram.com"
        }, {
          icon: <FaLinkedinIn />, url: "https://linkedin.com"
        }].map(({ icon, url }, i) => (
          <a
            key={i}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            style={iconStyle}
            onMouseEnter={(e) => e.currentTarget.style.background = "linear-gradient(45deg, #4facfe, #00f2fe)"}
            onMouseLeave={(e) => e.currentTarget.style.background = "rgba(255,255,255,0.1)"}
          >
            {icon}
          </a>
        ))}
      </div>

      {/* Copyright */}
      <p style={{
        fontSize: "0.95rem",
        color: "#a0aec0",
        fontWeight: "400",
        letterSpacing: "0.03em",
      }}>
        &copy; {new Date().getFullYear()} MyApp. All rights reserved.
      </p>
    </footer>
  );
};

// Shared Styles
const linkStyle = {
  color: "#cbd5e1",
  textDecoration: "none",
  transition: "color 0.3s ease",
  cursor: "pointer",
};
Object.assign(linkStyle, {
  ':hover': {
    color: "#4facfe",
    textShadow: "0 0 8px #4facfe",
  }
});

const iconStyle = {
  color: "#fff",
  fontSize: "1.6rem",
  background: "rgba(255,255,255,0.1)",
  padding: "14px",
  borderRadius: "50%",
  boxShadow: "0 0 10px rgba(0,0,0,0.2)",
  transition: "background 0.3s ease, transform 0.3s ease",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

export default Footer;
