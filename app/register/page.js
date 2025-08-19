"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const [message, setMessage] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

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

      if (res.ok) {
        setMessage("Registration successful! Redirecting...");
        setTimeout(() => router.push("/login"), 1500);
      } else {
        setMessage(data.message || "Registration failed. Check your input.");
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
          backgroundColor: "#ffffffcc",
          boxShadow: "0 12px 40px rgba(0,0,0,0.25)",
          transition: "0.3s",
        }}
      >
        <h2
          className="text-center text-primary mb-4"
          style={{ fontWeight: "700", letterSpacing: "1px", fontSize: "2rem" }}
        >
          Register
        </h2>

        <form onSubmit={handleSubmit}>
          {[
            { label: "Name", type: "text", name: "name" },
            { label: "Username", type: "text", name: "username" },
            { label: "Password", type: "password", name: "password" },
            { label: "Confirm Password", type: "password", name: "confirmpassword" },
            { label: "Email", type: "email", name: "email" },
            { label: "Age", type: "number", name: "age" },
            { label: "Phone", type: "tel", name: "phone" },
          ].map((field) => (
            <div className="mb-3" key={field.name}>
              <label htmlFor={field.name} className="form-label fw-semibold text-dark">
                {field.label}
              </label>
              <input
                type={field.type}
                name={field.name}
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
            Register
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


