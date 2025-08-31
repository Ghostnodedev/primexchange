// app/layout.js
import './globals.css';
import { Toaster } from 'react-hot-toast';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Script from 'next/script';

export const metadata = {
  title: 'Next.js 13+ with Bootstrap',
  description: 'A better looking and responsive page.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* ✅ Bootstrap CSS */}
        <link
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css"
          rel="stylesheet"
        />
      </head>
      <body>
        {children}

        {/* ✅ Toaster (inside body) */}
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: '#1e293b',
              color: '#fff',
              padding: '16px 20px',
              borderRadius: '10px',
              fontSize: '0.95rem',
              position: 'relative',
              overflow: 'hidden',
            },
          }}
        />

        {/* ✅ Bootstrap JS Bundle (with Popper) */}
        <Script
          src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/js/bootstrap.bundle.min.js"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
