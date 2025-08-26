'use client';

import Link from 'next/link';

const Footer = () => {
  const footerStyle = {
    backgroundColor: '#222',
    color: '#eee',
    padding: '2rem 1rem',
    textAlign: 'center',
  };

  const listStyle = {
    listStyle: 'none',
    padding: 0,
    margin: '0 auto',
    maxWidth: '600px',
    display: 'flex',
    justifyContent: 'center',
    gap: '2rem',
    flexWrap: 'wrap',
  };

  const linkStyle = {
    color: '#eee',
    textDecoration: 'none',
    fontWeight: '600',
    cursor: 'pointer',
  };

  return (
    <footer style={footerStyle}>
      <ul style={listStyle}>
        <li>
          <Link href="/" style={linkStyle}>
            Home
          </Link>
        </li>
        <li>
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

      <p style={{ marginTop: '1rem', fontSize: '0.9rem', color: '#888' }}>
        &copy; {new Date().getFullYear()} MyApp. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
