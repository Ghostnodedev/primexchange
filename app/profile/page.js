/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { decryptData } from "../utils/crypo";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function ProfilePage() {
  const [email, setEmail] = useState("");
  const [totalAmount, setTotalAmount] = useState("0.00");
  const [depositAmount, setDepositAmount] = useState("0.00");
  const [sellAmount, setSellAmount] = useState("0.00");
  const [processing, setProcessing] = useState('processing');

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("authToken") || Cookies.get("authToken");
    if (token) {
      setIsAuthenticated(true);

      const storedEmail =
        localStorage.getItem("userEmail")
      if (storedEmail) setEmail(storedEmail);

      // fallback: decrypt last deposit stored in cookies
      const encryptedAmount = Cookies.get("depositAmount");
      if (encryptedAmount) {
        try {
          const decrypted = decryptData(encryptedAmount);
          const parsed = parseFloat(decrypted);
          if (!isNaN(parsed)) setDepositAmount(parsed.toFixed(2));
        } catch (err) {
          console.error("Failed to decrypt deposit:", err);
        }
      }
    } else {
      setIsAuthenticated(false);
    }
    setLoading(false);
  }, []);

  // Fetch profile data from API
  useEffect(() => {
    if (!email) return;

    const fetchData = async () => {
      try {
        const res = await fetch(
          `https://primexchange-apis-git-main-ghostnodedevs-projects.vercel.app/gprofile?email=${encodeURIComponent(
            email
          )}`
        );

        if (!res.ok) throw new Error("Failed to fetch profile data");

        const json = await res.json();
        console.log("Profile API Data:", json);

        const account = Array.isArray(json)
          ? json[0]
          : json.data
          ? json.data[0]
          : json;

        if (account) {
          setDepositAmount(account.depositamount || "0.00");
          setTotalAmount(account.totalamount || "0.00");
          setSellAmount(account.sellamount || "0.00");
          setProcessing(account.status || "0.00");
          if(account.status === "0" || account.status === 0 || account.status === null || account.status === "0.00"){
            setProcessing("Processing");
          }
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, [email]);

  const handleLogout = () => {
    localStorage.removeItem("email");
    Cookies.remove("depositAmount");
    localStorage.removeItem("authToken");
    Cookies.remove("authToken");
    router.push("/login");
  };

  if (loading) return null;

  if (!isAuthenticated) {
    return (
      <div
        className="d-flex justify-content-center align-items-center vh-100 text-center px-3"
        style={{
          background: "linear-gradient(135deg, #1a2a6c, #b21f1f, #fdbb2d)",
          color: "#fff",
        }}
      >
        <div
          className="p-5 rounded-4 shadow-lg"
          style={{
            background: "rgba(255,255,255,0.08)",
            backdropFilter: "blur(12px)",
            border: "1px solid rgba(255,255,255,0.2)",
            maxWidth: "420px",
            width: "100%",
          }}
        >
          <h2 className="fw-bold mb-3">⚠️ Please login to see your profile</h2>
          <p className="mb-4">Your banking profile and rewards are protected 🔒</p>
          <Link href="/login" passHref>
            <button
              className="px-5 py-3 fw-bold"
              style={{
                background: "linear-gradient(90deg, #4facfe, #00f2fe)",
                border: "none",
                borderRadius: "50px",
                fontSize: "1.1rem",
                color: "#fff",
                boxShadow: "0 4px 15px rgba(0,0,0,0.3)",
                cursor: "pointer",
              }}
            >
              🔑 Go to Login
            </button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div
      className="min-vh-100 d-flex flex-column align-items-center px-3 py-4"
      style={{
        background: "linear-gradient(135deg, #1a0033, #3a0ca3, #7209b7, #f72585)",
        paddingBottom: "60px",
      }}
    >
      {/* Profile Info */}
      <div className="text-white text-center mb-5">
        <img
          src="https://randomuser.me/api/portraits/men/75.jpg"
          alt="Profile"
          className="rounded-circle border border-4 shadow-lg"
          style={{ width: "140px", height: "140px", objectFit: "cover" }}
        />
        <h4 className="mt-3">{email || "someone@gmail.com"}</h4>
      </div>

      {/* Navigation */}
      <div
        className="d-flex justify-content-between align-items-center bg-dark rounded px-4 py-3 mb-5 w-100 mx-auto flex-wrap"
        style={{ maxWidth: "900px", gap: "12px" }}
      >
        <div className="d-flex align-items-center gap-4 flex-wrap">
          <Link href="/" className="text-decoration-none" style={{ color: "#fff" }}>
            <i className="bi bi-house"></i> <span>Home</span>
          </Link>
          <Link href="/exchange" className="text-decoration-none" style={{ color: "#fff" }}>
            <span>Exchange</span>
          </Link>
          <span
            className="text-danger"
            onClick={handleLogout}
            style={{ cursor: "pointer" }}
          >
            Logout
          </span>
        </div>
        <div className="d-flex gap-2 flex-wrap">
          <button
            className="btn btn-outline-light"
            onClick={() => router.push("/mine")}
            style={{ minWidth: "140px", color: "#fff", borderColor: "#fff" }}
          >
            Enter Bank Detail
          </button>
          <Link href="/exchange">
            <button
              className="btn btn-success"
              style={{ minWidth: "140px", color: "#fff" }}
            >
              Sell Now
            </button>
          </Link>
        </div>
      </div>

      {/* Amount Boxes */}
      <div
        className="d-flex justify-content-center gap-4 flex-wrap w-100 mx-auto"
        style={{ maxWidth: "900px" }}
      >
        {[
          { title: `${processing}`, value: `${depositAmount}` },
          { title: "Total Amount", value: `$${totalAmount}` },
          { title: "Sell Amount", value: `$${sellAmount}` },

        ].map((item) => (
          <div
            key={item.title}
            className="bg-dark p-4 rounded shadow-lg text-center flex-grow-1"
            style={{ minWidth: "220px", maxWidth: "280px", color: "#fff" }}
          >
            <div className="text" style={{ color: "#ddd" }}>
              {item.title}
            </div>
            <h3 className="mt-2">{item.value}</h3>
          </div>
        ))}
      </div>

      <div
        className="mx-auto rounded shadow-lg mt-5 px-4 py-3 w-100"
        style={{
          background: "#d63384",
          maxWidth: "360px",
          boxShadow: "0 0 25px rgba(214, 51, 132, 0.7)",
          color: "#fff",
        }}
      >
        <div className="d-flex justify-content-between align-items-center flex-wrap gap-3">
          <div>
            <div style={{ color: "#fff" }}>Reward Balance</div>
            <h3>$0.00</h3>
          </div>
          <button
            className="btn btn-warning fw-bold px-4 py-2 flex-grow-1"
            style={{ minWidth: "150px", color: "white" }}
          >
            Claim Reward
          </button>
        </div>
      </div>

      {/* Lavish Buttons Below Reward */}
      <div
        className="d-flex justify-content-center gap-4 mt-5 flex-wrap w-100 mx-auto"
        style={{ maxWidth: "900px" }}
      >
        {[
          { label: "Home", href: "/" },
          { label: "Exchange", href: "/exchange" },
          { label: "Mine", href: "/mine" },
        ].map(({ label, href }) => (
          <Link key={label} href={href} passHref>
            <button
              className="btn lavish-btn shadow-lg"
              style={{
                minWidth: "200px",
                padding: "16px 36px",
                fontWeight: "600",
                fontSize: "1.2rem",
                borderRadius: "18px",
                cursor: "pointer",
                background: "linear-gradient(45deg, #7b2ff7, #f107a3)",
                color: "white",
                border: "none",
                boxShadow: "0 6px 22px rgba(241, 7, 163, 0.7)",
                transition: "transform 0.2s ease, box-shadow 0.2s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "scale(1.07)";
                e.currentTarget.style.boxShadow =
                  "0 10px 36px rgba(241, 7, 163, 0.95)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "scale(1)";
                e.currentTarget.style.boxShadow =
                  "0 6px 22px rgba(241, 7, 163, 0.7)";
              }}
            >
              {label}
            </button>
          </Link>
        ))}
      </div>

      <a
        href="https://wa.me/your-number"
        target="_blank"
        rel="noopener noreferrer"
        className="position-fixed bottom-0 end-0 m-4"
        style={{ zIndex: 1000 }}
      >
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
          alt="WhatsApp"
          style={{ width: "60px", height: "60px" }}
        />
      </a>
    </div>
  );
}
