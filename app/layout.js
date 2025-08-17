// app/layout.js

import './globals.css';
export const metadata = {
  title: 'Next.js 13+ with Bootstrap',
  description: 'A better looking and responsive page.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
