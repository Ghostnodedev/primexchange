/* eslint-disable @next/next/no-img-element */
"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import "bootstrap/dist/css/bootstrap.min.css";
import toast from "react-hot-toast";

export default function RegisterPage() {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formdata = {
      name: e.target.name.value,
      username: e.target.username.value,
      password: e.target.password.value,
      confirmpassword: e.target.confirmpassword.value,
      email: e.target.email.value,
      age: e.target.age.value,
      phone: e.target.phone.value,
    };

    try {
      const res = await fetch(
        "https://primexchange-apis-git-main-ghostnodedevs-projects.vercel.app/register",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formdata),
        }
      );

      const data = await res.json();
      setLoading(false);

      if (res.ok) {
        setMessage("Registration successful! Redirecting...");
        toast.success("Registration successful!");
        setTimeout(() => router.push("/login"), 1500);
      } else {
        setMessage(data.message || "Registration failed. Check your input.");
        toast.error(data.message || "Registration failed. Check your input.");
      }
    } catch (err) {
      setLoading(false);
      setMessage("Network error");
      console.error(err);
    }
  };

  return (
    <>

      <style jsx>{`
        @import url("https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap");

        * {
          box-sizing: border-box;
        }

        body,
        html,
        #__next {
          height: 120%;
          width: 100%;
          margin: 0;
          font-family: "Poppins", sans-serif;
          background: linear-gradient(135deg, #141e30, #243b55);
        }

.container {
  max-width: 950px;
  width: 100%;
  margin: auto;
  min-height: 100vh; /* changed from height: 100vh */
  display: flex;
  border-radius: 20px;
  overflow: hidden;
  box-shadow:
    0 8px 20px rgba(0, 0, 0, 0.6),
    inset 0 0 60px #4a00e0,
    inset 0 0 80px #6a00ff;
  background: #0f2027;
}

        .left-panel {
          flex: 1;
          background: linear-gradient(135deg, #6a11cb, #2575fc);
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          color: white;
          padding: 3rem;
          position: relative;
          overflow: hidden;
        }

        .left-panel h2 {
          font-size: 2.8rem;
          font-weight: 700;
          margin-bottom: 1rem;
          text-shadow: 0 0 10px rgba(255, 255, 255, 0.2);
          user-select: none;
        }

        .left-panel p {
          font-size: 1.15rem;
          font-weight: 500;
          line-height: 1.5;
          max-width: 300px;
          text-align: center;
          opacity: 0.85;
          user-select: none;
        }

        .left-panel::before {
          content: "";
          position: absolute;
          top: -20%;
          left: -30%;
          width: 150%;
          height: 150%;
          background: radial-gradient(circle at center, #ffffff30 20%, transparent 70%);
          filter: blur(150px);
          pointer-events: none;
        }

.right-panel {
  flex: 1;
  background: #fdfcfe;
  padding: 4rem 4.5rem; /* increased padding for vertical breathing space */
  overflow-y: auto;
  box-shadow:
    0 10px 30px rgba(106, 17, 203, 0.2);
  border-radius: 0 20px 20px 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

form {
  display: flex;
  flex-direction: column;
  max-width: 450px;
  margin: auto;
  width: 100%;
  margin-top: 1.5rem; /* added margin top to form */
}

        h2.form-title {
          color: #3b1a7b;
          font-weight: 700;
          margin-bottom: 3rem;
          font-size: 2.5rem;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          text-align: center;
          user-select: none;
        }

        label {
          margin-bottom: 0.5rem;
          font-weight: 600;
          color: #4a2975;
          letter-spacing: 0.03em;
          font-size: 1.05rem;
          user-select: none;
        }

        input {
          padding: 14px 18px;
          margin-bottom: 2rem;
          border-radius: 14px;
          border: 2px solid #d5c2ff;
          font-size: 1.15rem;
          transition: all 0.4s ease;
          background: #f8f6ff;
          box-shadow: inset 4px 4px 10px #c8b6f9,
            inset -4px -4px 6px #ffffff;
          color: #321e75;
          font-weight: 500;
          outline-offset: 3px;
        }

        input::placeholder {
          color: #9a87cc;
          font-weight: 400;
        }

        input:focus {
          border-color: #6a11cb;
          box-shadow:
            0 0 12px 3px rgba(106, 17, 203, 0.6),
            inset 4px 4px 10px #b390ff,
            inset -4px -4px 6px #d1bbff;
          background: #f0eaff;
          outline: none;
          color: #3b1a7b;
          font-weight: 600;
        }

        button {
          margin-top: 1rem;
          background: linear-gradient(135deg, #6a11cb, #2575fc);
          border: none;
          color: white;
          font-weight: 700;
          font-size: 1.25rem;
          padding: 18px 0;
          border-radius: 30px;
          cursor: pointer;
          box-shadow: 0 10px 25px rgba(58, 12, 163, 0.7);
          transition: all 0.3s ease;
          text-transform: uppercase;
          letter-spacing: 0.12em;
          display: flex;
          justify-content: center;
          align-items: center;
          user-select: none;
        }

        button:disabled {
          opacity: 0.65;
          cursor: not-allowed;
          box-shadow: none;
        }

        button:hover:not(:disabled) {
          background: linear-gradient(135deg, #2575fc, #6a11cb);
          box-shadow: 0 14px 30px rgba(58, 12, 163, 0.9);
          transform: translateY(-3px);
        }

        .message {
          margin-top: 1.5rem;
          padding: 1rem;
          border-radius: 18px;
          background: #d7c9ff;
          color: #4a2975;
          font-weight: 700;
          text-align: center;
          letter-spacing: 0.05em;
          box-shadow: 0 0 15px rgba(74, 41, 117, 0.5);
          user-select: none;
        }

        .footer-text {
          margin-top: 2.5rem;
          text-align: center;
          font-weight: 600;
          color: #6a11cb;
          letter-spacing: 0.05em;
          font-size: 1rem;
          user-select: none;
        }

        .footer-text a {
          color: #2575fc;
          font-weight: 700;
          text-decoration: none;
          transition: color 0.3s ease;
          outline-offset: 3px;
        }

        .footer-text a:hover,
        .footer-text a:focus {
          color: #6a11cb;
          text-decoration: underline;
          outline: none;
        }

        /* Scrollbar for right panel */
        .right-panel::-webkit-scrollbar {
          width: 8px;
        }

        .right-panel::-webkit-scrollbar-thumb {
          background: #6a11cb;
          border-radius: 20px;
        }

        .right-panel::-webkit-scrollbar-track {
          background: transparent;
        }

        /* Spinner */
        .spinner-border {
          width: 1rem;
          height: 1rem;
          border: 0.15em solid currentColor;
          border-right-color: transparent;
          border-radius: 50%;
          animation: spinner 0.75s linear infinite;
          margin-right: 0.5rem;
        }

        @keyframes spinner {
          to {
            transform: rotate(360deg);
          }
        }

        /* Responsive */

@media (max-width: 991px) {
  .container {
    flex-direction: column;
    height: auto;
    max-height: 100vh;
  }

  .left-panel {
    display: none; /* Hide left panel on mobile */
  }

  .right-panel {
    flex: none;
    width: 100%;
    max-height: 100vh;
    border-radius: 20px;
    padding: 2.5rem 2rem;
    box-shadow: 0 10px 30px rgba(106, 17, 203, 0.2);
  }

  form {
    max-width: 100%;
  }
}

      `}</style>
      <div className="container" role="main">
        <section className="left-panel" aria-label="Welcome message">
          <h2>Welcome to PrimeX</h2>
          <p>
            Register now and step into a world of exclusive opportunities with
            a sleek, modern platform designed just for you.
          </p>
        </section>

        <section className="right-panel" aria-label="Registration form">
          <h2 className="form-title">Create Account</h2>
          <form onSubmit={handleSubmit} noValidate>
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="John Doe"
              required
              autoComplete="name"
            />

            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              placeholder="Choose a username"
              required
              autoComplete="username"
              minLength={3}
              maxLength={20}
            />


            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter password"
              required
              autoComplete="new-password"
              minLength={6}
            />

            <label htmlFor="confirmpassword">Confirm Password</label>
            <input
              type="password"
              id="confirmpassword"
              name="confirmpassword"
              placeholder="Re-enter password"
              required
              autoComplete="new-password"
              minLength={6}
            />

            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="your.email@example.com"
              required
              autoComplete="email"
            />

            <label htmlFor="age">Age</label>
            <input
              type="number"
              id="age"
              name="age"
              placeholder="Enter your age"
              required
              min={13}
              max={120}
            />

            <label htmlFor="phone">Phone</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              placeholder="+1 234 567 8901"
              required
              pattern="^\+?[0-9\s\-]{7,15}$"
            />

            <button type="submit" disabled={loading} aria-live="polite">
              {loading && <span className="spinner-border" role="status" aria-hidden="true"></span>}
              {loading ? "Registering..." : "Open Account"}
            </button>
          </form>

          {message && <div className="message" role="alert">{message}</div>}

          <p className="footer-text">
            Already have an account?{" "}
            <a href="/login" tabIndex={0}>
              Sign In
            </a>
          </p>
        </section>
      </div>
    </>
  );
}
