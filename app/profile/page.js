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
  const router = useRouter();

  useEffect(() => {
    const storedEmail = localStorage.getItem("email");
    if (storedEmail) {
      setEmail(storedEmail);
    }

    const encryptedAmount = Cookies.get("depositAmount");
    if (encryptedAmount) {
      try {
        const decrypted = decryptData(encryptedAmount);
        const parsed = parseFloat(decrypted);
        if (!isNaN(parsed)) {
          setTotalAmount(parsed.toFixed(2));
        }
      } catch (err) {
        console.error("Failed to decrypt amount:", err);
      }
    }
  }, []);

  const handleLogout = () => {
    // Clear user data
    localStorage.removeItem("email");
    Cookies.remove("depositAmount");
    // Add any other cleanup you need

    // Redirect to login or landing page
    router.push("/login"); // Change this to your login route
  };

  return (
    <div
      className="min-vh-100"
      style={{
        background: "linear-gradient(135deg, #1a0033, #3a0ca3, #7209b7, #f72585)",
      }}
    >
      <div className="container py-4 text-white text-center">
        <img
          src="https://randomuser.me/api/portraits/men/75.jpg"
          alt="Profile"
          className="rounded-circle border border-4"
          style={{ width: "120px", height: "120px", objectFit: "cover" }}
        />
        <h5 className="mt-3">{email || "someone@gmail.com"}</h5>
      </div>

      <div className="d-flex justify-content-between align-items-center px-4 py-3 bg-dark rounded mx-4">
        <div className="d-flex align-items-center gap-4 text-white">
          <Link href="/" className="d-flex align-items-center gap-1 text-white text-decoration-none">
            <i className="bi bi-house"></i> <span>Home</span>
          </Link>
          <Link href="/exchange" className="text-white text-decoration-none">
            <span>Exchange</span>
          </Link>
          <span
            className="text-danger cursor-pointer"
            onClick={handleLogout}
            style={{ cursor: "pointer" }}
          >
            Logout
          </span>
        </div>
        <div>
          <button className="btn btn-outline-light me-2">Enter Bank Detail</button>
          <Link href="/exchange">
            <button className="btn btn-success">Sell Now</button>
          </Link>
        </div>
      </div>

      <div className="d-flex justify-content-center gap-4 text-white py-5 flex-wrap">
        {[
          { title: "Total Amount", value: `$${totalAmount}` },
          { title: "Available ($)", value: "$0.00" },
          { title: "Progressing ($)", value: "$0.00" },
        ].map((item) => (
          <div
            key={item.title}
            className="bg-dark p-4 rounded text-center"
            style={{ minWidth: "200px" }}
          >
            <div>{item.title}</div>
            <h3>{item.value}</h3>
          </div>
        ))}
      </div>

      <div
        className="mx-auto text-white p-4 rounded"
        style={{ background: "#d63384", maxWidth: "300px" }}
      >
        <div className="d-flex justify-content-between align-items-center">
          <div>
            <div>Reward Balance</div>
            <h3>$0.00</h3>
          </div>
          <button className="btn btn-warning fw-bold">Claim Reward</button>
        </div>
      </div>

      <a
        href="https://wa.me/your-number"
        target="_blank"
        rel="noopener noreferrer"
        className="position-fixed bottom-0 end-0 m-4"
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
