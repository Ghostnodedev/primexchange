"use client";
import { useState } from "react";
import { useRouter } from "next/navigation"; // ✅ Correct import

export default function LoginPage() {
  const [message, setMessage] = useState("");
  const router = useRouter(); 

  const handleSubmit = async (e) => {
  e.preventDefault();

  const formdata = {
    username: e.target.username.value,
    password: e.target.password.value,
    email: e.target.email.value,
    phone: e.target.phone.value,
  };

  try {
    const res = await fetch("https://primexchange-apis-git-main-ghostnodedevs-projects.vercel.app/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formdata),
    });

    const data = await res.json(); // 👈 Parse response JSON

    if (res.ok) {
      const token = data.token; // 👈 Extract token from response

      if (token) {
        localStorage.setItem("authToken", token); // ✅ Store in localStorage
        setMessage("Login successful! Redirecting...");
        setTimeout(() => router.push("/"), 1500);
      } else {
        setMessage("Login successful, but no token received.");
      }
    } else {
      setMessage(data.message || "Login failed. Check your credentials.");
    }
  } catch (err) {
    setMessage("Network error");
    console.error(err);
  }
};

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card shadow-lg p-4" style={{ width: "100%", maxWidth: "400px" }}>
        <h2 className="text-center text-primary mb-4">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="username" className="form-label">Username</label>
            <input type="text" name="username" className="form-control" required />
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input type="password" name="password" className="form-control" required />
          </div>

          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email</label>
            <input type="email" name="email" className="form-control" required />
          </div>

          <div className="mb-3">
            <label htmlFor="phone" className="form-label">Phone</label>
            <input type="tel" name="phone" className="form-control" required />
          </div>

          <button type="submit" className="btn btn-primary w-100 py-2">Login</button>
        </form>

        {message && (
          <div className="alert alert-info mt-3 text-center" role="alert">
            {message}
          </div>
        )}
      </div>
    </div>
  );
}