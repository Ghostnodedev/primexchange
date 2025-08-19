"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

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
      const res = await fetch(
        "https://primexchange-apis-git-main-ghostnodedevs-projects.vercel.app/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formdata),
        }
      );

      const data = await res.json();

      if (res.ok) {
        const token = data.token;
        if (token) {
          localStorage.setItem("authToken", token);
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
    <div
      className="d-flex justify-content-center align-items-center vh-100 p-3"
      style={{
        background: "linear-gradient(135deg, #0d6efd, #3a8dff)",
        minHeight: "100vh",
      }}
    >
      <div
        className="card shadow-lg p-5 border-0"
        style={{
          width: "100%",
          maxWidth: "500px",
          borderRadius: "20px",
          backgroundColor: "#ffffffcc", // semi-transparent white
          boxShadow: "0 12px 40px rgba(0,0,0,0.25)",
          transition: "0.3s",
        }}
      >
        <h2
          className="text-center text-primary mb-4"
          style={{ fontWeight: "700", letterSpacing: "1px", fontSize: "2rem" }}
        >
          Login
        </h2>

        <form onSubmit={handleSubmit}>
          {["username", "password", "email", "phone"].map((field) => (
            <div className="mb-3" key={field}>
              <label className="form-label fw-semibold text-dark" htmlFor={field}>
                {field.charAt(0).toUpperCase() + field.slice(1)}
              </label>
              <input
                type={field === "password" ? "password" : field === "email" ? "email" : "text"}
                name={field}
                className="form-control shadow-sm"
                required
                style={{
                  borderRadius: "10px",
                  transition: "0.3s",
                }}
              />
            </div>
          ))}

          <button
            type="submit"
            className="btn btn-primary w-100 py-2"
            style={{
              fontWeight: "600",
              fontSize: "1.1rem",
              borderRadius: "12px",
              transition: "0.3s",
            }}
          >
            Login
          </button>
        </form>

        {message && (
          <div
            className="alert alert-primary mt-4 text-center"
            role="alert"
            style={{ borderRadius: "12px", fontWeight: "500", fontSize: "0.95rem" }}
          >
            {message}
          </div>
        )}
      </div>
    </div>
  );
}
