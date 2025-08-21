/* eslint-disable @next/next/no-img-element */
"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import "bootstrap/dist/css/bootstrap.min.css";

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
      className="d-flex justify-content-center align-items-center vh-100"
      style={{
        background: "linear-gradient(135deg, #0d6efd, #3a8dff)",
      }}
    >
      <div
        className="container d-flex flex-lg-row flex-column shadow-lg p-0"
        style={{
          borderRadius: "15px",
          overflow: "hidden",
          maxWidth: "950px",
          width: "100%",
          backgroundColor: "#fff",
        }}
      >
        {/* Left Image Section */}
        <div
          className="d-none d-lg-flex flex-column justify-content-center align-items-center p-4"
          style={{
            flex: "1",
            background: "linear-gradient(135deg, #1e3c72, #2a5298)",
            color: "white",
          }}
        >
          <img
            src="https://th.bing.com/th/id/OIP.VnobXPt0APwk8hllR30huwHaPb?w=115&h=180&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3" 
            alt="Register illustration"
            className="img-fluid mb-3"
            style={{ maxHeight: "400px", borderRadius: "10px" }}
          />
          <p className="text-center small opacity-75">
            Join us and explore the best platform with modern UI.
          </p>
        </div>

        {/* Right Form Section */}
        <div
          className="p-5 flex-fill"
          style={{
            backgroundColor: "#fff",
          }}
        >
          <h2 className="fw-bold mb-4 text-dark">Register</h2>

          <form onSubmit={handleSubmit}>
            <div className="row">
              {/* Name */}
              <div className="col-md-6 mb-3">
                <label className="form-label fw-semibold">Name</label>
                <input
                  type="text"
                  name="name"
                  className="form-control border-0 border-bottom rounded-0"
                  placeholder="Enter name"
                  required
                />
              </div>

              {/* Username */}
              <div className="col-md-6 mb-3">
                <label className="form-label fw-semibold">Username</label>
                <input
                  type="text"
                  name="username"
                  className="form-control border-0 border-bottom rounded-0"
                  placeholder="Choose username"
                  required
                />
              </div>

              {/* Password */}
              <div className="col-md-6 mb-3">
                <label className="form-label fw-semibold">Password</label>
                <input
                  type="password"
                  name="password"
                  className="form-control border-0 border-bottom rounded-0"
                  placeholder="Enter password"
                  required
                />
              </div>

              {/* Confirm Password */}
              <div className="col-md-6 mb-3">
                <label className="form-label fw-semibold">Confirm Password</label>
                <input
                  type="password"
                  name="confirmpassword"
                  className="form-control border-0 border-bottom rounded-0"
                  placeholder="Re-enter password"
                  required
                />
              </div>

              {/* Email */}
              <div className="col-md-6 mb-3">
                <label className="form-label fw-semibold">Email</label>
                <input
                  type="email"
                  name="email"
                  className="form-control border-0 border-bottom rounded-0"
                  placeholder="Enter email"
                  required
                />
              </div>

              {/* Age */}
              <div className="col-md-6 mb-3">
                <label className="form-label fw-semibold">Age</label>
                <input
                  type="number"
                  name="age"
                  className="form-control border-0 border-bottom rounded-0"
                  placeholder="Enter age"
                  required
                />
              </div>

              {/* Phone */}
              <div className="col-12 mb-4">
                <label className="form-label fw-semibold">Phone</label>
                <input
                  type="tel"
                  name="phone"
                  className="form-control border-0 border-bottom rounded-0"
                  placeholder="Enter phone number"
                  required
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="btn btn-primary w-100 py-2 fw-semibold"
              style={{
                borderRadius: "10px",
                fontSize: "1.1rem",
              }}
            >
              Open Account
            </button>
          </form>

          {message && (
            <div
              className="alert alert-info mt-4 text-center"
              role="alert"
              style={{ borderRadius: "8px" }}
            >
              {message}
            </div>
          )}

          <p className="text-center mt-3 small text-muted">
            Already have an account?{" "}
            <a href="/login" className="fw-semibold text-primary">
              Sign In
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
