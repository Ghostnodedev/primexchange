"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function LoginPage() {
  const [message, setMessage] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formdata = {
      username: e.target.username.value,
      email: e.target.email.value,
      password: e.target.password.value,
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
        toast.success("Login successful!");
        if (token) {
          localStorage.setItem("authToken", token);
          setMessage("Login successful! Redirecting...");
          setTimeout(() => router.push("/"), 1500);
        } else {
          setMessage("Login successful, but no token received.");
        }
      } else {
        setMessage(data.message || "Login failed. Check your credentials.");
        toast.error(data.message || "Login failed. Check your credentials.");
      }
    } catch (err) {
      setMessage("Network error");
      console.error(err);
    }
  };

  return (
    <div
      className="vh-100 d-flex flex-column"
      style={{
        background: "linear-gradient(135deg, #1a0033, #3a0ca3, #7209b7, #f72585)",
        color: "white",
      }}
    >
      {/* Main Layout */}
      <div className="d-flex flex-grow-1">
        {/* Left Login Box */}
        <div
          className="d-flex flex-column justify-content-center align-items-center px-5"
          style={{
            flex: "0 0 40%",
            backgroundColor: "rgba(15, 15, 40, 0.95)",
            borderRadius: "0 30px 30px 0",
          }}
        >
          <div className="text-center mb-4">
            <i
              className="bi bi-person-circle"
              style={{ fontSize: "5rem", color: "#0dcaf0" }}
            ></i>
          </div>

          <form className="w-100" onSubmit={handleSubmit} style={{ maxWidth: "300px" }}>
            {/* Username */}
            <div className="mb-3">
              <label htmlFor="username" className="form-label text-white fw-semibold">
                Username
              </label>
              <input
                type="text"
                name="username"
                id="username"
                placeholder="Enter your username"
                className="form-control bg-dark text-white border-0 px-3 py-2"
                required
                style={{ borderRadius: "10px" }}
              />
            </div>

            {/* Email */}
            <div className="mb-3">
              <label htmlFor="email" className="form-label text-white fw-semibold">
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Enter your email"
                className="form-control bg-dark text-white border-0 px-3 py-2"
                required
                style={{ borderRadius: "10px" }}
              />
            </div>

            {/* Password */}
            <div className="mb-3">
              <label htmlFor="password" className="form-label text-white fw-semibold">
                Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="Enter your password"
                className="form-control bg-dark text-white border-0 px-3 py-2"
                required
                style={{ borderRadius: "10px" }}
              />
            </div>

            {/* Phone Number */}
            <div className="mb-3">
              <label htmlFor="phone" className="form-label text-white fw-semibold">
                Phone Number
              </label>
              <input
                type="tel"
                name="phone"
                id="phone"
                placeholder="Enter your phone number"
                className="form-control bg-dark text-white border-0 px-3 py-2"
                required
                style={{ borderRadius: "10px" }}
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="btn w-100 py-2 fw-bold"
              style={{
                backgroundColor: "#f72585",
                borderRadius: "10px",
                color: "white",
              }}
            >
              REGISTER
            </button>

            {/* Remember me */}
            <div className="d-flex justify-content-between mt-3 text-white-50 small">
              <div>
                <input type="checkbox" id="remember" />{" "}
                <label htmlFor="remember">Remember me</label>
              </div>
              <a href="#" className="text-white-50 text-decoration-none">
                Forgot your password?
              </a>
            </div>
          </form>

          {message && (
            <div
              className="alert alert-primary mt-4 text-center w-100"
              role="alert"
              style={{ borderRadius: "12px", fontWeight: "500" }}
            >
              {message}
            </div>
          )}
        </div>

        {/* Right Welcome Section */}
        <div
          className="d-flex flex-column justify-content-center align-items-center text-center flex-grow-1"
        >
          <h1 className="fw-bold display-4">Welcome.</h1>
          <p className="text-white-50" style={{ maxWidth: "400px" }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed diam
            nonumy eirmod tempor invidunt ut labore.
          </p>
          <p className="mt-3">
            Already a member?{" "}
            <a href="#" className="text-info fw-semibold">
              Sign in now
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
