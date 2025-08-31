/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { decryptData } from "../utils/crypo"; // adjust path if needed

export default function ProfilePage() {
  const [email, setEmail] = useState("");
  const [totalAmount, setTotalAmount] = useState("0.00");

  useEffect(() => {
    // Get email from localStorage
    const storedEmail = localStorage.getItem("email");
    if (storedEmail) {
      setEmail(storedEmail);
    }

    // Get and decrypt deposit amount
    const encryptedAmount = Cookies.get("depositAmount");
    if (encryptedAmount) {
      try {
        const decrypted = decryptData(encryptedAmount);
        setTotalAmount(parseFloat(decrypted).toFixed(2));
      } catch (err) {
        console.error("Failed to decrypt amount:", err);
      }
    }
  }, []);

  return (
    <div
      className="min-vh-100"
      style={{
        background: "linear-gradient(135deg, #1a0033, #3a0ca3, #7209b7, #f72585)",
      }}
    >
      {/* Top section */}
      <div className="container py-4 text-white text-center">
        <img
          src="https://randomuser.me/api/portraits/men/75.jpg"
          alt="Profile"
          className="rounded-circle border border-4"
          style={{ width: "120px", height: "120px", objectFit: "cover" }}
        />
        <h5 className="mt-3">{email || "someone@gmail.com"}</h5>
      </div>

      {/* Nav bar section */}
      <div className="d-flex justify-content-between align-items-center px-4 py-3 bg-dark rounded mx-4">
        <div className="d-flex align-items-center gap-4 text-white">
          <i className="bi bi-house"></i> <span>Home</span>
          <span>Exchange</span>
          <span className="text-danger">Logout</span>
        </div>
        <div>
          <button className="btn btn-outline-light me-2">Enter Bank Detail</button>
          <button className="btn btn-success">Sell Now</button>
        </div>
      </div>

      {/* Balance section */}
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
            <div className="text-white">{item.title}</div>
            <h3>{item.value}</h3>
          </div>
        ))}
      </div>

      {/* Reward section */}
      <div
        className="mx-auto bg-pink text-white p-4 rounded"
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

      {/* WhatsApp Button */}
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
