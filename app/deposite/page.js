/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { decryptData } from "../utils/crypo"; // adjust path if needed
import { Button, Form, InputGroup } from "react-bootstrap";
import { FaRegCopy } from "react-icons/fa";
import { toast } from "react-hot-toast";

export default function DepositPage() {
  const [timer, setTimer] = useState(1800); // 30 minutes countdown
  const [inputId, setInputId] = useState("");
  const [depositId, setDepositId] = useState("KPXLUN1BTSH9WAM");
  const [address, setAddress] = useState("TXCp9wCpnZzjAp6nSNqY4885Z5fDLc9gE");
  const [amount, setAmount] = useState(null); // null while loading
  const [createTime, setCreateTime] = useState("");

  // Read amount from cookie and decrypt on mount
useEffect(() => {
  const encryptedLastAmount = Cookies.get("lastDepositAmount");
  if (encryptedLastAmount) {
    try {
      const decrypted = decryptData(encryptedLastAmount);
      const latest = parseFloat(decrypted);
      if (!isNaN(latest)) {
        setAmount(latest);
      } else {
        toast.error("Invalid last deposit amount.");
        setAmount(0);
      }
    } catch (error) {
      toast.error("Failed to read last deposit.");
      setAmount(0);
    }
  } else {
    setAmount(0);
  }
}, []);


  // Countdown timer logic
  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => (prev <= 0 ? 0 : prev - 1));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Set current date/time on mount
  useEffect(() => {
    const now = new Date();

    const formatDateTime = (date) => {
      const pad = (n) => n.toString().padStart(2, "0");
      const year = date.getFullYear();
      const month = pad(date.getMonth() + 1);
      const day = pad(date.getDate());
      const hours = pad(date.getHours());
      const minutes = pad(date.getMinutes());
      const seconds = pad(date.getSeconds());
      return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    };

    setCreateTime(formatDateTime(now));
  }, []);

  const formatTime = (seconds) => {
    const min = Math.floor(seconds / 60)
      .toString()
      .padStart(2, "0");
    const sec = (seconds % 60).toString().padStart(2, "0");
    return `${min}:${sec}`;
  };

  const handleCopy = (value) => {
    navigator.clipboard.writeText(value);
    toast.success("Copied to clipboard!");
  };

  const handleCancel = () => {
    toast.error("Transaction cancelled.");
    // Add cancel logic here (e.g. router.back() or call an API)
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
        <div className="d-flex justify-content-center mb-2">
          <img
            src="/qr-sample.png"
            alt="QR Code"
            className="rounded"
            style={{ maxWidth: "180px" }}
          />
        </div>
        <p className="text-center text-white mb-4">⏳ {formatTime(timer)} Remaining</p>

        <p
          className="text-white text-center mb-4"
          style={{ fontSize: "0.9rem" }}
        >
          If you have transaction fees, don’t forget to add it. The transfer
          amount must match the deposit amount.
        </p>

        <InputGroup className="mb-3">
          <Form.Control
            placeholder="Please enter txid"
            value={inputId}
            onChange={(e) => setInputId(e.target.value)}
          />
          <Button variant="success">Submit</Button>
        </InputGroup>

        <div className="bg-black p-3 rounded-3 mb-3">
          <div className="mb-2">
            <small className="text-muted">Deposit Amount</small>
            <div className="d-flex align-items-center justify-content-between">
              <span>{amount !== null ? amount : "Loading..."}</span>
              <img src="/usdt-icon.png" alt="USDT" style={{ width: "20px" }} />
            </div>
          </div>

          <hr className="bg-secondary" />

          <div className="mb-2">
            <small className="text-muted">Deposit Address</small>
            <div className="d-flex align-items-center justify-content-between">
              <span className="text-break">{address}</span>
              <FaRegCopy
                onClick={() => handleCopy(address)}
                style={{ cursor: "pointer" }}
              />
            </div>
            <div
              className="alert alert-warning mt-2 py-1 px-2"
              style={{ fontSize: "0.8rem" }}
            >
              ⚠️ Only support USDT-TRC20. Any issues caused by improper
              operation will not be borne by the platform. Please operate with
              caution and double-check the recharge address carefully.
            </div>
          </div>

          <hr className="bg-secondary" />

          <div className="mb-2">
            <small className="text-muted">Deposit Id</small>
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
            <small className="text-muted">Network</small>
            <div className="d-flex align-items-center justify-content-between">
              <span>TRC20</span>
              <img
                src="data:image/webp;base64,UklGRqARAABXRUJQVlA4IJQRAACQTQCdASrkAOoAPp1KoEslpKMhpjU6gLATiWRu38PJr4hP9b2lVxu8/kb+W/zj1/+7/gD0ZvDiPH64/KX73+5f2f9nPmd6JPuI9wv+F/xH/o/4f/EdlLzFfsp+1vu8/jN78P9f6gH9B/0v/37Cv0AP3L9NL90/hH/ar9lv/N70n//1ibyh/uv6h3Ff8P+s+f9i5Ac/EWe/sJ4AXhveOwAfUvzyvnfMzSHaAHiGZvn0P/c+wz5VHsI/aL//+5R+vv//Y5kuEpF5vxFfd2eCLzwfi1Nvi7ZU3k1KFz5j09v3VzBETATeqIDmgpJlh7z7n9A3BRsBQb5WQBSFQc0M77YWXO9vrYF7LkB69YMROmiVCDeMhTjuScndalq0yqs1+gyNsFCXc4dhVs35/ibk3ZIRLpybKZ8EUj/Tm5FS1gMXd+rVXQ5p0RTpkm4Mjz9huTD2i899MeMZOU9qJ7KxwomHVd5JMbV6A7tP5Vx1xhwbCmpbxVtF8RVlg6viV1JYvpCKbZHiFb1hDrJz5EWtnOSjsBlup7cypli0/GkXeQznafBAYZCBu09Omhldf1xy6/HBCeLXkE4c0qPrpHMmfWSuNN2hHRynGS6j/Tp+cpZeWAhtluAucMzuCSuyHxpg53M1M+Duyuea/c7pdqNLICk+0MIQYs0Kt2k+HedVRj0b3ew7Io/XXwd7fwwiYhc4yMwrGLYb2cJhD35DrXlFplMbMgh5ZVd7dOUIAEUkhG8Lq0odRUt/LDmk0eS/NuDNbqciLqwzRwmHovcZSL14Lg2fJZn7ZpFCvdCsRB7exhc8xf5uY/dtxJJ3QddL3F2uNNrS44/LkHy88w4Mbc4UfU0ltXtDxDFcFG4f0NgNUpBx7k32NkTShvEfz2fR12k8kX/mfvkq5EuRFXyU6bfepb3LfDcLP5e6/T6ntDfUg6/i+Jt2p1fexX8G9K9pvxduCqlNKYfpv39/6PBdSQKg==" 
                alt="TRC20"
                style={{ width: "20px" }}
              />
            </div>
          </div>

          <hr className="bg-secondary" />

          <div className="mb-2">
            <small className="text-muted">Create Time</small>
            <div>{createTime}</div>
          </div>

          <div className="d-grid mt-3">
            <Button variant="danger" onClick={handleCancel}>
              Cancel Transaction
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
