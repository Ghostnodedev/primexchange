/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { decryptData, encryptData } from "../utils/crypo";
import { Button, Form, InputGroup } from "react-bootstrap";
import { FaRegCopy } from "react-icons/fa";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

export default function DepositPage() {
  const [timer, setTimer] = useState(1800);
  const [inputId, setInputId] = useState("");
  const [depositId] = useState("KPXLUN1BTSH9WAM");
  const [address] = useState("TY6Ee4uRZogxhu2j3i3Jhp9wLkU8TX3a");
  const [amount, setAmount] = useState(null);
  const [createTime, setCreateTime] = useState("");
  const [sellamount, setsellamount] = useState("0.00");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [storedEmail, setStoredEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const router = useRouter();

  const Api_Url =
    "https://primexchange-apis-git-main-ghostnodedevs-projects.vercel.app/profile";

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    setIsAuthenticated(!!token);

    const email = localStorage.getItem("userEmail");
    if (email) setStoredEmail(email);
  }, []);

useEffect(() => {
  const email = localStorage.getItem("userEmail");
  if (!email) {
    console.warn("No user email found in localStorage.");
    return;
  }

  const cookieKey = `SNGDTASRVR_${email}`;
  const encryptedLastAmount = Cookies.get(cookieKey);

  if (encryptedLastAmount) {
    try {
      const decrypted = decryptData(encryptedLastAmount);
      const parsed = parseFloat(decrypted);
      setAmount(isNaN(parsed) ? 0 : parsed);
    } catch (e) {
      console.error("Failed to decrypt cookie", e);
      setAmount(0);
    }
  } else {
    setAmount(0);
  }
}, []);


  useEffect(() => {
    const encryptedAmount = Cookies.get("SellAmount");
    if (encryptedAmount) {
      try {
        const decrypted = decryptData(encryptedAmount);
        const parsed = parseFloat(decrypted);
        if (!isNaN(parsed)) {
          setsellamount(parsed.toFixed(2));
        }
      } catch (err) {
        console.error("Failed to decrypt amount:", err);
      }
    }
  }, []);

  // ✅ Countdown timer
  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => (prev <= 0 ? 0 : prev - 1));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // ✅ Created time formatter
  useEffect(() => {
    const now = new Date();
    const pad = (n) => n.toString().padStart(2, "0");
    const formatted = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(
      now.getDate()
    )} ${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`;
    setCreateTime(formatted);
  }, []);

  // Format timer
  const formatTime = (seconds) => {
    const min = Math.floor(seconds / 60).toString().padStart(2, "0");
    const sec = (seconds % 60).toString().padStart(2, "0");
    return `${min}:${sec}`;
  };

  // Copy helper
  const handleCopy = (value) => {
    navigator.clipboard.writeText(value);
    toast.success("Copied to clipboard!");
  };

  // Cancel handler
  const handleCancel = () => {
    toast.error("Transaction cancelled.");
    router.push("/exchange");
  };

  // ✅ Submit TXID
const handleSubmitTxid = async () => {
  if (!inputId || inputId.length < 6) {
    toast.error("Please enter a valid TXID.");
    return;
  }
  setIsSubmitting(true);
  try {
    const encryptedAmount = Cookies.get("depositAmount");
    let total = 0;
    if (encryptedAmount) {
      const decrypted = decryptData(encryptedAmount);
      total = parseFloat(decrypted) || 0;
    }
    const updatedTotal = total + (amount || 0);
    // 🧠 Show "Payment processing..." modal
    Swal.fire({
      title: "Payment in processing...",
      text: "Please wait while we process your deposit.",
      icon: "info",
      allowOutsideClick: false,
      showConfirmButton: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });
    // Submit to API
    const response = await fetch(Api_Url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: "N/A",
        totalamount: 0 || "N/A",
        depositamount: amount,
        sellamount,
        email: storedEmail,
        status: "pending",
      }),
    });
    const data = await response.json();
    // ✅ Wait 10-15 seconds
    setTimeout(() => {
      Swal.close(); // Close the modal
      toast.success("Transaction submitted successfully!");
      router.push("/profile");
    }, 10000); // 10 seconds (use 15000 for 15s)
  } catch (err) {
    console.error("Error submitting transaction:", err);
    Swal.close(); // Ensure the modal closes on error
    toast.error("Something went wrong while saving the deposit.");
  } finally {
    setIsSubmitting(false);
  }
};

  return (
    <div
      className="d-flex justify-content-center align-items-center py-5 px-3"
      style={{
        minHeight: "100vh",
        background: "linear-gradient(to right, #241654, #8c27e0)",
      }}
    >
      <div
        className="bg-dark text-white rounded-4 p-4 shadow-lg"
        style={{ width: "100%", maxWidth: "500px" }}
      >
        <h5 className="text-center mb-4">Scan The QR Code And Pay</h5>

        {/* QR Code */}
        <div
          className="d-flex justify-content-center mb-3 p-3"
          style={{
            borderRadius: "20px",
            boxShadow:
              "0 0 20px 6px rgba(140, 39, 224, 0.6), 0 0 40px 12px rgba(140, 39, 224, 0.4)",
            backgroundColor: "#000",
            maxWidth: "fit-content",
            margin: "0 auto 20px",
          }}
        >
          <img
            src="/qrcode.jpeg"
            alt="QR Code"
            className="rounded"
            style={{ maxWidth: "180px", borderRadius: "16px" }}
          />
        </div>

        <p className="text-center text-white mb-4">
          ⏳ {formatTime(timer)} Remaining
        </p>

        <p
          className="text-white text-center mb-4"
          style={{ fontSize: "0.9rem" }}
        >
          If you have transaction fees, don’t forget to add it. The transfer
          amount must match the deposit amount.
        </p>

        {/* TXID input */}
        <InputGroup className="mb-3">
          <Form.Control
            placeholder="Please enter txid"
            value={inputId}
            onChange={(e) => setInputId(e.target.value)}
          />
<Button variant="success" onClick={handleSubmitTxid} disabled={isSubmitting}>
  {isSubmitting ? "Submitting..." : "Submit"}
</Button>
        </InputGroup>

        <div
          className="bg-black p-3 rounded-3 mb-3"
          style={{ boxShadow: "0 0 12px rgba(140, 39, 224, 0.4)" }}
        >
          <div className="mb-2">
            <small className="text">Deposit Amount</small>
            <div className="d-flex align-items-center justify-content-between">
              <span>{amount !== null ? amount : "Loading..."}</span>
              <img src="https://th.bing.com/th/id/ODL.f77bee50b666ec22175d8eef78c3bf56?w=298&h=298&c=10&rs=1&o=6&dpr=1.3&pid=AlgoBlockDebug" alt="USDT" style={{ width: "20px" }} />
            </div>
          </div>

          <hr className="bg-secondary" />

          <div className="mb-2">
            <small className="text">Deposit Address</small>
            <div className="d-flex align-items-center justify-content-between">
              <span className="text-break">{address}</span>
              <FaRegCopy
                onClick={() => handleCopy(address)}
                style={{ cursor: "pointer" }}
              />
            </div>
          </div>

          <hr className="bg-secondary" />

          <div className="mb-2">
            <small className="text">Deposit Id</small>
            <div className="d-flex align-items-center justify-content-between">
              <span>{depositId}</span>
              <FaRegCopy
                onClick={() => handleCopy(depositId)}
                style={{ cursor: "pointer" }}
              />
            </div>
          </div>

          <hr className="bg-secondary" />

          <div className="mb-2">
            <small className="text">Network</small>
            <div className="d-flex align-items-center justify-content-between">
              <span>TRC20</span>
              <FaRegCopy
                onClick={() => handleCopy("TRC20")}
                style={{ cursor: "pointer" }}
              />
            </div>
          </div>

          <hr className="bg-secondary" />

          <div className="mb-2 d-flex justify-content-between align-items-center">
            <small className="text">Created Time</small>
            <span>{createTime}</span>
          </div>

          <Button
            variant="danger"
            className="w-100 mt-3"
            onClick={handleCancel}
          >
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
}
