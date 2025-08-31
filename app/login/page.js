"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function LoginPage() {
  const [message, setMessage] = useState("");
  const [emailForReset, setEmailForReset] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      require("bootstrap/dist/js/bootstrap.bundle.min.js");
    }
  }, []);

  // ✅ Login Submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formdata = {
      username: e.target.username.value,
      email: e.target.email.value,
      phone: e.target.phone.value,
      password: e.target.password.value,
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
        const { token } = data;
        toast.success("Login successful!");
        localStorage.setItem("authToken", token);
        localStorage.setItem("username", formdata.username);

        setMessage("Login successful! Redirecting...");
        setTimeout(() => router.push("/"), 1500);
      } else {
        toast.error(data.message || "Login failed. Check your credentials.");
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong.");
    }
  };

  // ✅ Forgot Password - Request OTP
  const handleEmailSubmit = async () => {
    const email = document.getElementById("resetEmail").value;

    if (!email) return toast.error("Email is required.");

    try {
      const res = await fetch(
        "https://primexchange-apis-git-main-ghostnodedevs-projects.vercel.app/request-otp",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        }
      );

      const data = await res.json();

      if (res.ok) {
        toast.success("OTP sent to email. Verify to reset your password.");
        setOtpSent(true);
        setEmailForReset(email);

        window.bootstrap.Modal.getOrCreateInstance(
          document.getElementById("emailModal")
        ).hide();

        window.bootstrap.Modal.getOrCreateInstance(
          document.getElementById("otpModal")
        ).show();
      } else {
        toast.error(data.message || "Email not found.");
      }
    } catch (err) {
      console.error(err);
      toast.error("Network error.");
    }
  };

  // ✅ Verify OTP
  const handleOtpSubmit = async () => {
    const otp = document.getElementById("otp").value;
    if (!otp) return toast.error("OTP is required.");

    try {
      const res = await fetch(
        "https://primexchange-apis-git-main-ghostnodedevs-projects.vercel.app/verify-otp",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: emailForReset, otp }),
        }
      );

      const data = await res.json();

      if (res.ok) {
        toast.success("OTP verified. Set a new password.");

        window.bootstrap.Modal.getOrCreateInstance(
          document.getElementById("otpModal")
        ).hide();

        window.bootstrap.Modal.getOrCreateInstance(
          document.getElementById("passwordModal")
        ).show();
      } else {
        toast.error(data.message || "Invalid OTP.");
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong.");
    }
  };

  // ✅ Reset Password
  const handleResetPassword = async () => {
    const newPassword = document.getElementById("newPassword").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    if (!newPassword || !confirmPassword) {
      return toast.error("All fields are required.");
    }
    if (newPassword !== confirmPassword) {
      return toast.error("Passwords do not match.");
    }

    try {
      const res = await fetch(
        "https://primexchange-apis-git-main-ghostnodedevs-projects.vercel.app/reset-password",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: emailForReset, newPassword }),
        }
      );

      const data = await res.json();

      if (res.ok) {
        toast.success("Password reset successfully!");
        window.bootstrap.Modal.getOrCreateInstance(
          document.getElementById("passwordModal")
        ).hide();
      } else {
        toast.error(data.message || "Password reset failed.");
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong.");
    }
  };

  return (
    <div
      className="vh-100 d-flex flex-column"
      style={{
        background:
          "linear-gradient(135deg, #1a0033, #3a0ca3, #7209b7, #f72585)",
        color: "white",
      }}
    >
      <div className="container-fluid h-100">
        <div className="row h-100 g-0">
          {/* Left Section: Login Form */}
          <div
            className="col-12 col-md-5 d-flex flex-column justify-content-center align-items-center px-4 px-md-5"
            style={{
              backgroundColor: "rgba(15, 15, 40, 0.95)",
              borderRadius: "0 30px 30px 0",
              minHeight: "100vh",
            }}
          >
            <div className="text-center mb-4">
              <i
                className="bi bi-person-circle"
                style={{ fontSize: "5rem", color: "#0dcaf0" }}
              ></i>
            </div>

            {/* Extra Text for Mobile */}
            <p className="text-center text-white-50 d-md-none mb-4 px-3">
              Welcome back! Please login to your account or register if youre new
              here.
            </p>

            <form
              className="w-100"
              onSubmit={handleSubmit}
              style={{ maxWidth: "320px" }}
            >
              {/* Username */}
              <div className="mb-3">
                <label
                  htmlFor="username"
                  className="form-label text-white fw-semibold"
                >
                  Username
                </label>
                <input
                  type="text"
                  name="username"
                  id="username"
                  className="form-control bg-dark text-white border-0 px-3 py-2"
                  placeholder="Enter your username"
                  required
                  style={{ borderRadius: "10px" }}
                />
              </div>

              {/* Email */}
              <div className="mb-3">
                <label
                  htmlFor="email"
                  className="form-label text-white fw-semibold"
                >
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="form-control bg-dark text-white border-0 px-3 py-2"
                  placeholder="Enter your email"
                  required
                  style={{ borderRadius: "10px" }}
                />
              </div>

              {/* Phone */}
              <div className="mb-3">
                <label
                  htmlFor="phone"
                  className="form-label text-white fw-semibold"
                >
                  Phone
                </label>
                <input
                  type="tel"
                  name="phone"
                  id="phone"
                  pattern="[0-9]{10}"
                  className="form-control bg-dark text-white border-0 px-3 py-2"
                  placeholder="Enter 10-digit phone number"
                  required
                  style={{ borderRadius: "10px" }}
                />
              </div>

              {/* Password */}
              <div className="mb-3">
                <label
                  htmlFor="password"
                  className="form-label text-white fw-semibold"
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  className="form-control bg-dark text-white border-0 px-3 py-2"
                  placeholder="Enter your password"
                  required
                  style={{ borderRadius: "10px" }}
                />
              </div>

              {/* Login Button */}
              <button
                type="submit"
                className="btn w-100 py-2 fw-bold"
                style={{
                  backgroundColor: "#f72585",
                  borderRadius: "10px",
                  color: "white",
                }}
              >
                LOGIN
              </button>

              {/* Remember + Forgot Password */}
              <div className="d-flex justify-content-between mt-3 text-white-50 small">
                <div>
                  <input type="checkbox" id="remember" />{" "}
                  <label htmlFor="remember">Remember me</label>
                </div>
                <a
                  href="#"
                  className="text-white-50 text-decoration-none"
                  data-bs-toggle="modal"
                  data-bs-target="#emailModal"
                >
                  Forgot your password?
                </a>
              </div>

              {/* Register Link for Mobile */}
              <p className="text-center mt-4 d-md-none">
                Not a member?{" "}
                <a href="/register" className="text-info fw-semibold">
                  Register now
                </a>
              </p>
            </form>

            {message && (
              <div className="alert alert-primary mt-4 text-center w-100">
                {message}
              </div>
            )}
          </div>

          {/* Right Section: Welcome Text for md+ screens */}
          <div className="col-md-7 d-none d-md-flex flex-column justify-content-center align-items-center text-center flex-grow-1 px-5">
            <h1 className="fw-bold display-4">Welcome.</h1>
            <p className="text-white-50" style={{ maxWidth: "400px" }}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </p>
            <p className="mt-3">
              Not a member?{" "}
              <a href="/register" className="text-info fw-semibold">
                Register now
              </a>
            </p>
          </div>
        </div>
      </div>

      {/* ✅ Email Modal */}
      <div className="modal fade" id="emailModal" tabIndex="-1">
        <div className="modal-dialog">
          <div className="modal-content bg-dark text-white">
            <div className="modal-header">
              <h5 className="modal-title">Enter your email</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
              ></button>
            </div>
            <div className="modal-body">
              <input
                type="email"
                id="resetEmail"
                className="form-control"
                placeholder="Enter your email"
              />
            </div>
            <div className="modal-footer">
              <button className="btn btn-secondary" data-bs-dismiss="modal">
                Close
              </button>
              <button className="btn btn-primary" onClick={handleEmailSubmit}>
                Send OTP
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ✅ OTP Modal */}
      <div className="modal fade" id="otpModal" tabIndex="-1">
        <div className="modal-dialog">
          <div className="modal-content bg-dark text-white">
            <div className="modal-header">
              <h5 className="modal-title">Verify OTP</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
              ></button>
            </div>
            <div className="modal-body">
              <input
                type="text"
                id="otp"
                className="form-control"
                placeholder="Enter OTP"
              />
            </div>
            <div className="modal-footer">
              <button className="btn btn-secondary" data-bs-dismiss="modal">
                Close
              </button>
              <button className="btn btn-primary" onClick={handleOtpSubmit}>
                Verify OTP
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ✅ Password Reset Modal */}
      <div className="modal fade" id="passwordModal" tabIndex="-1">
        <div className="modal-dialog">
          <div className="modal-content bg-dark text-white">
            <div className="modal-header">
              <h5 className="modal-title">Reset Your Password</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
              ></button>
            </div>
            <div className="modal-body">
              <input
                type="password"
                id="newPassword"
                className="form-control mb-3"
                placeholder="New password"
              />
              <input
                type="password"
                id="confirmPassword"
                className="form-control"
                placeholder="Confirm password"
              />
            </div>
            <div className="modal-footer">
              <button className="btn btn-secondary" data-bs-dismiss="modal">
                Close
              </button>
              <button className="btn btn-primary" onClick={handleResetPassword}>
                Reset Password
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
