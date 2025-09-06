"use client";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { FaPlus, FaUniversity } from "react-icons/fa";
import toast from "react-hot-toast";
import { Button } from "react-bootstrap";

const API_URL =
  "https://primexchange-apis-git-main-ghostnodedevs-projects.vercel.app/account"; // POST URL

export default function BankManager() {
  const [accounts, setAccounts] = useState([]);
  const [showForm, setShowForm] = useState(true);
  const [selectedId, setSelectedId] = useState(null);
  const [amount, setAmount] = useState("");
  const [sold, setSold] = useState(false);
  const [totalAmount, setTotalAmount] = useState("0.00");
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [storedEmail, setStoredEmail] = useState(null);

  // Auth & email
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    setIsAuthenticated(!!token);

    const email = localStorage.getItem("userEmail");
    if (email) setStoredEmail(email);
  }, []);

  // Fetch accounts from API
  useEffect(() => {
    if (!storedEmail) return;

    const fetchAccounts = async () => {
      try {
        const res = await fetch(
          `https://primexchange-apis-git-main-ghostnodedevs-projects.vercel.app/gacc?email=${encodeURIComponent(
            storedEmail
          )}`
        );
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        const data = await res.json();
        setAccounts(data.data || []);
        setShowForm((data.data || []).length === 0);
        if ((data.data || []).length > 0)
          setSelectedId(String(data.data[0].id));
      } catch (err) {
        console.error("Error fetching accounts:", err);
        toast.error("Failed to fetch accounts");
      }
    };

    fetchAccounts();
  }, [storedEmail]);

  // Save selected bank to cookies
  useEffect(() => {
    if (selectedId !== null) {
      Cookies.set("selectedBank", String(selectedId), { expires: 7 });
    } else {
      Cookies.remove("selectedBank");
    }
  }, [selectedId]);



  const handleSelect = (id) => setSelectedId(String(id));

const handleSell = async () => {
  if (!amount) return toast.error("Enter amount first!");
  const numericAmount = parseFloat(amount);
  const numericTotal = parseFloat(totalAmount);

  if (isNaN(numericAmount) || numericAmount <= 0)
    return toast.error("Invalid amount.");
  if (!numericTotal || numericTotal <= 0)
    return toast.error("Please deposit funds before selling.");
  if (numericAmount > numericTotal) return toast.error("Insufficient funds.");

  try {
    const res = await fetch("https://-main-ghostnodedevs-projects.vercel.app/account", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        amount: numericAmount,
      }),
    });

    if (!res.ok) throw new Error("Failed to sell amount");

    const data = await res.json();
    // Update local total amount after successful sell
    const newTotal = numericTotal - numericAmount;
    setTotalAmount(newTotal);
    Cookies.set("depositAmount", newTotal, { expires: 7 });
    setSold(true);
    toast.success(`✅ Sold $${numericAmount} successfully!`);
  } catch (err) {
    console.error(err);
    toast.error("Failed to sell amount");
  }
};

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const bankName = form.bankName.value.trim();
    const type = form.type.value;
    const holderName = form.holderName.value.trim();
    const ifsc = form.ifsc.value.trim();
    const accountNumber = form.accountNumber.value.trim();

    if (!bankName || !type || !holderName || !ifsc || !accountNumber) {
      toast.error("Please fill all fields");
      return;
    }

    const newAccount = {
      id: Date.now().toString(),
      holdername: holderName,
      accountno: accountNumber,
      ifsc: ifsc,
      bankname: bankName,
      accounttype: type,
      sellamount: 0,
      email: storedEmail || "unknown",
      amount: sellamount
    };

    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newAccount),
      });
      if (!res.ok) throw new Error("Failed to save account");

      setAccounts((prev) => [...prev, newAccount]);
      setShowForm(false);
      form.reset();
      toast.success("✅ Bank account saved!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to save account");
    }
  };

  if (isAuthenticated === null) return null;
  if (!isAuthenticated)
    return (
      <div
        className="vh-100 d-flex flex-column align-items-center justify-content-center text-center"
        style={{
          background: "linear-gradient(135deg, #000428 0%, #004e92 100%)",
          color: "white",
          padding: "2rem",
        }}
      >
        <h2>Access Restricted</h2>
        <Button variant="success" size="lg" href="/login">
          🔑 Go to Login
        </Button>
      </div>
    );

  return (
    <div style={pageStyle}>
      <div style={containerStyle}>
        <h1 style={titleStyle}>💳 Manage Bank Accounts</h1>

        {/* Accounts Grid */}
        {accounts.length > 0 && (
          <div style={gridStyle}>
            {accounts.map((acc) => {
              const isSelected =
                String(acc.id) === String(selectedId || acc.id);
              return (
                <div
                  key={acc.id}
                  style={{
                    ...cardStyle,
                    border: isSelected
                      ? "2px solid #ffd700"
                      : "1px solid rgba(255,255,255,0.08)",
                    boxShadow: isSelected
                      ? "0 14px 40px rgba(255,215,0,0.08)"
                      : cardStyle.boxShadow,
                    transform: isSelected ? "translateY(-4px)" : "none",
                    cursor: "pointer",
                  }}
                  onClick={() => handleSelect(acc.id)}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "flex-start",
                      gap: "12px",
                    }}
                  >
                    <div>
                      <FaUniversity
                        size={28}
                        style={{ color: "#ffd700", marginBottom: 8 }}
                      />
                      <h3 style={{ margin: "0 0 6px 0" }}>{acc.bankname}</h3>
                      <p style={{ margin: "4px 0", color: "rgba(255,255,255,0.9)" }}>
                        <strong>Type:</strong> {acc.accounttype}
                      </p>
                      <p style={{ margin: "4px 0", color: "rgba(255,255,255,0.9)" }}>
                        <strong>Holder:</strong> {acc.holdername}
                      </p>
                      <p style={{ margin: "4px 0", color: "rgba(255,255,255,0.85)" }}>
                        <strong>IFSC:</strong> {acc.ifsc}
                      </p>
                      <p style={{ margin: "4px 0", color: "rgba(255,255,255,0.85)" }}>
                        <strong>Account:</strong> {acc.accountno}
                      </p>
                      <p style={{ margin: "4px 0", color: "rgba(255,255,255,0.85)" }}>
                        <strong>Sell Amount:</strong> {acc.sellamount || 0}
                      </p>
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
                      <input
                        type="radio"
                        name="selectedBank"
                        checked={isSelected}
                        onChange={() => handleSelect(acc.id)}
                        style={{ width: 20, height: 20, accentColor: "#ffd700", cursor: "pointer" }}
                        onClick={(e) => e.stopPropagation()}
                      />
                      {isSelected && <span style={{ fontSize: 12, color: "#ffd700" }}>Default</span>}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Add Account Form */}
        {showForm && (
          <form onSubmit={handleSubmit} style={formContainerStyle}>
            <h2 style={{ marginTop: 0 }}>Add Bank Account</h2>
            <div style={rowStyle}>
              <label style={labelStyle}>Bank Name</label>
              <input name="bankName" style={inputFieldStyle} placeholder="e.g., HDFC Bank" required />
            </div>
            <div style={rowStyle}>
              <label style={labelStyle}>Account Type</label>
              <select name="type" style={inputFieldStyle} defaultValue="Savings" required>
                <option value="Savings">Savings</option>
                <option value="Current">Current</option>
                <option value="Salary">Salary</option>
              </select>
            </div>
            <div style={rowStyle}>
              <label style={labelStyle}>Holder Name</label>
              <input name="holderName" style={inputFieldStyle} placeholder="Account holder full name" required />
            </div>
            <div style={rowStyle}>
              <label style={labelStyle}>IFSC Code</label>
              <input name="ifsc" style={inputFieldStyle} placeholder="e.g., HDFC0001234" required />
            </div>
            <div style={rowStyle}>
              <label style={labelStyle}>Account Number</label>
              <input name="accountNumber" style={inputFieldStyle} placeholder="Enter account number" required />
            </div>
            <div style={{ display: "flex", gap: 12, marginTop: 14 }}>
              <button type="submit" style={saveBtnStyle}>
                Save Account
              </button>
              <button type="button" onClick={() => setShowForm(false)} style={cancelBtnStyle}>
                Cancel
              </button>
            </div>
          </form>
        )}

        {/* Add More + Sell Section */}
        {!showForm && (
          <>
            <div style={{ textAlign: "center", marginTop: 28 }}>
              <button title="Add bank" onClick={() => setShowForm(true)} style={plusBtnStyle}>
                <FaPlus color="#000" />
              </button>
              <div style={{ marginTop: 10, color: "rgba(255,255,255,0.8)" }}>Add another account</div>
            </div>

            {/* Sell Section */}
            <div style={{ marginTop: 20, textAlign: "center" }}>
              <label style={{ display: "block", marginBottom: 8, fontWeight: 600 }}>Enter Amount to Sell</label>
              <div style={{ display: "flex", justifyContent: "center", gap: 10, alignItems: "center" }}>
                {!sold ? (
                  <>
                    <span style={{ color: "#fff", fontSize: 20 }}>$</span>
                    <input
                      type="number"
                      placeholder="Amount"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      style={inputFieldStyle}
                    />
                    <div style={{ minWidth: 100, display: "flex", justifyContent: "center" }}>
                      <button
                        onClick={handleSell}
                        disabled={!amount}
                        style={{
                          background: !amount ? "#555" : "#22c55e",
                          color: "#fff",
                          border: "none",
                          padding: "10px 16px",
                          borderRadius: 8,
                          fontWeight: 600,
                          cursor: !amount ? "not-allowed" : "pointer",
                          width: "100%",
                          opacity: !amount ? 0.6 : 1,
                        }}
                      >
                        Sell
                      </button>
                    </div>
                  </>
                ) : (
                  <span style={{ color: "#22c55e", fontWeight: 600, fontSize: 16 }}>✅ Sold</span>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

/* ---------------- styles ---------------- */
const pageStyle = {
  minHeight: "100vh",
  background: "linear-gradient(135deg, #0f1724 0%, #2b2445 50%, #6b4b8a 100%)",
  color: "#fff",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "40px 20px",
};
const containerStyle = { width: "100%", maxWidth: 1100 };
const titleStyle = {
  textAlign: "center",
  fontSize: 34,
  marginBottom: 22,
  fontWeight: 700,
  background: "linear-gradient(90deg,#fff,#ffd700)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
};
const gridStyle = { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 18, marginBottom: 18 };
const cardStyle = {
  background: "linear-gradient(180deg, rgba(255,255,255,0.03), rgba(255,255,255,0.02))",
  borderRadius: 14,
  padding: 18,
  boxShadow: "0 10px 30px rgba(2,6,23,0.6)",
  transition: "all 220ms ease",
};
const formContainerStyle = {
  background: "linear-gradient(180deg, rgba(255,255,255,0.06), rgba(255,255,255,0.03))",
  borderRadius: 12,
  padding: 20,
  maxWidth: 520,
  margin: "18px auto 0",
  boxShadow: "0 14px 40px rgba(2,6,23,0.6)",
};
const rowStyle = { marginBottom: 12, display: "flex", flexDirection: "column", gap: 6 };
const labelStyle = { fontSize: 13, color: "rgba(255,255,255,0.85)", fontWeight: 600 };
const inputFieldStyle = {
  padding: "12px 14px",
  borderRadius: 8,
  border: "1px solid rgba(255,255,255,0.12)",
  background: "rgba(0,0,0,0.25)",
  color: "#fff",
  outline: "none",
  fontSize: 15,
  width: "100%",
  maxWidth: 400,
  boxSizing: "border-box",
};
const saveBtnStyle = {
  background: "#ffd700",
  color: "#000",
  border: "none",
  padding: "10px 16px",
  borderRadius: 8,
  fontWeight: 700,
  cursor: "pointer",
  flex: 1,
};
const cancelBtnStyle = {
  background: "transparent",
  color: "#fff",
  border: "1px solid rgba(255,255,255,0.12)",
  padding: "10px 14px",
  borderRadius: 8,
  cursor: "pointer",
};
const plusBtnStyle = {
  background: "#ffd700",
  color: "#000",
  border: "none",
  borderRadius: "50%",
  width: 64,
  height: 64,
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: 20,
  boxShadow: "0 12px 30px rgba(0,0,0,0.45)",
  cursor: "pointer",
};
