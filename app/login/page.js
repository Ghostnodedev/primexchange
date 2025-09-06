"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function LoginPage() {
  const [message, setMessage] = useState("");
  const [emailForReset, setEmailForReset] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      require("bootstrap/dist/js/bootstrap.bundle.min.js");
    }
  }, []);

const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);

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
        body: JSON.stringify({ email: formdata.email, password: formdata.password }), // only send email & password
      }
    );

    const data = await res.json();
    if (res.ok) {
      const { token, user } = data;
      toast.success("Login successful!");

      // ✅ Store token and email in localStorage
      localStorage.setItem("authToken", token);
      localStorage.setItem("userEmail", user.email); // store email dynamically
      localStorage.setItem("username", formdata.username);

      setMessage("Login successful! Redirecting...");
      setTimeout(() => router.push("/profile"), 1500);
    } else {
      toast.error(data.message || "Login failed. Check your credentials.");
    }
  } catch (err) {
    toast.error("Something went wrong.");
  } finally {
    setLoading(false);
  }
};


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
        toast.success("OTP sent to email.");
        setOtpSent(true);
        setEmailForReset(email);
        bootstrap.Modal.getOrCreateInstance(document.getElementById("emailModal")).hide();
        bootstrap.Modal.getOrCreateInstance(document.getElementById("otpModal")).show();
      } else toast.error(data.message || "Email not found.");
    } catch {
      toast.error("Network error.");
    }
  };

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
        toast.success("OTP verified.");
        bootstrap.Modal.getOrCreateInstance(document.getElementById("otpModal")).hide();
        bootstrap.Modal.getOrCreateInstance(document.getElementById("passwordModal")).show();
      } else toast.error(data.message || "Invalid OTP.");
    } catch {
      toast.error("Something went wrong.");
    }
  };

  const handleResetPassword = async () => {
    const newPassword = document.getElementById("newPassword").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    if (!newPassword || !confirmPassword) return toast.error("All fields are required.");
    if (newPassword !== confirmPassword) return toast.error("Passwords do not match.");

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
        toast.success("Password reset successful.");
        bootstrap.Modal.getOrCreateInstance(document.getElementById("passwordModal")).hide();
      } else toast.error(data.message || "Password reset failed.");
    } catch {
      toast.error("Something went wrong.");
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
      <div className="container-fluid flex-grow-1">
        <div className="row h-100 g-0">
          {/* Login Section */}
          <div
            className="col-12 col-md-5 d-flex flex-column justify-content-center align-items-center px-4 px-md-5"
            style={{
              backgroundColor: "rgba(15, 15, 40, 0.95)",
              borderRadius: "0 30px 30px 0",
              boxShadow: "0 0 30px rgba(0,0,0,0.15)",
            }}
          >
            <div className="text-center mb-4">
              <i
                className="bi bi-shield-lock"
                style={{ fontSize: "4rem", color: "#0dcaf0" }}
              ></i>
              <h2 className="fw-bold mt-2">Login to PrimExchange</h2>
            </div>

            <form
              className="w-100"
              onSubmit={handleSubmit}
              style={{ maxWidth: "340px" }}
            >
              {["username", "email", "phone", "password"].map((field, i) => (
                <div className="mb-3" key={i}>
                  <label className="form-label fw-semibold" htmlFor={field}>
                    {field.charAt(0).toUpperCase() + field.slice(1)}
                  </label>
                  <input
                    type={
                      field === "password"
                        ? "password"
                        : field === "email"
                        ? "email"
                        : "text"
                    }
                    name={field}
                    id={field}
                    className="form-control bg-dark text-white"
                    placeholder={`Enter your ${field}`}
                    required
                    style={{ borderRadius: "10px", padding: "10px" }}
                    pattern={field === "phone" ? "[0-9]{10}" : undefined}
                  />
                </div>
              ))}

              <button
                type="submit"
                className="btn w-100 py-2 fw-bold"
                disabled={loading}
                style={{
                  backgroundColor: "#f72585",
                  borderRadius: "10px",
                  color: "white",
                }}
              >
                {loading ? (
                  <>
                    <span
                      className="spinner-border spinner-border-sm me-2"
                      role="status"
                      aria-hidden="true"
                    ></span>
                    Logging in...
                  </>
                ) : (
                  "LOGIN"
                )}
              </button>

              <div className="d-flex justify-content-between mt-3 text-white-50 small">
                <div>
                  <input type="checkbox" id="remember" />{" "}
                  <label htmlFor="remember">Remember me</label>
                </div>
                <a
                  href="#"
                  className="text-decoration-none"
                  data-bs-toggle="modal"
                  data-bs-target="#emailModal"
                >
                  Forgot password?
                </a>
              </div>
            </form>

            {/* Register link for mobile */}
            <div className="mt-3 text-center d-md-none">
              <p className="text-white-50">
                Not a member?{" "}
                <a href="/register" className="text-info fw-semibold">
                  Register now
                </a>
              </p>
            </div>

            {message && (
              <div className="alert alert-info mt-3 text-center w-100">{message}</div>
            )}
          </div>

          {/* Right Panel (optional content) */}
          <div className="col-md-7 d-none d-md-flex flex-column justify-content-center align-items-center text-center px-5">
            <h1 className="fw-bold display-4">Welcome.</h1>
            <p className="text-white-50" style={{ maxWidth: "400px" }}>
              PrimExchange is your secure gateway to trading. Log in to access your
              dashboard.
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
                className="btn-close btn-close-white"
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
                className="btn-close btn-close-white"
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
                Cancel
              </button>
              <button className="btn btn-success" onClick={handleOtpSubmit}>
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
                className="btn-close btn-close-white"
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
                Cancel
              </button>
              <button className="btn btn-warning" onClick={handleResetPassword}>
                Reset Password
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

      