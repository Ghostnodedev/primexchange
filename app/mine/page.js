"use client";

import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { FaPlus, FaUniversity } from "react-icons/fa";
// import Navbar from "../component/header";

/**
 * BankDetails Manager
 * - Form adds bank accounts and then hides
 * - Cards show saved accounts with radio to select default
 * - Accounts and selectedId are persisted in cookies
 */

export default function BankManager() {
  const [accounts, setAccounts] = useState([]);
  const [showForm, setShowForm] = useState(true); // show form by default if no accounts
  const [selectedId, setSelectedId] = useState(null);

  // On mount: load accounts + selected from cookies
  useEffect(() => {
    try {
      const saved = Cookies.get("bankAccounts");
      const selected = Cookies.get("selectedBank");
      if (saved) {
        const parsed = JSON.parse(saved);
        setAccounts(parsed);
        setShowForm(parsed.length === 0); // if no saved accounts, show form
      } else {
        setShowForm(true);
      }
      if (selected) setSelectedId(String(selected));
    } catch (err) {
      console.error("Failed to load bank accounts from cookies", err);
    }
  }, []);

  // whenever accounts change, persist in cookie
  useEffect(() => {
    try {
      Cookies.set("bankAccounts", JSON.stringify(accounts), { expires: 7 });
    } catch (err) {
      console.error("Failed to save bank accounts to cookies", err);
    }
  }, [accounts]);

  // when selectedId changes, persist in cookie
  useEffect(() => {
    if (selectedId !== null) {
      Cookies.set("selectedBank", String(selectedId), { expires: 7 });
    } else {
      Cookies.remove("selectedBank");
    }
  }, [selectedId]);

  // helper to create compact unique id
  const makeId = () =>
    Date.now().toString(36) + Math.random().toString(36).slice(2, 8);

  const handleSubmit = (e) => {
    e.preventDefault();

    const form = e.target;
    const bankName = form.bankName.value.trim();
    const type = form.type.value;
    const holderName = form.holderName.value.trim();
    const ifsc = form.ifsc.value.trim();
    const accountNumber = form.accountNumber.value.trim();

    if (!bankName || !type || !holderName || !ifsc || !accountNumber) {
      alert("Please fill all fields");
      return;
    }

    const newAccount = {
      id: makeId(),
      bankName,
      type,
      holderName,
      ifsc,
      accountNumber,
    };

    setAccounts((prev) => {
      const updated = [...prev, newAccount];
      // if this is the first account, auto-select it
      if (prev.length === 0) setSelectedId(String(newAccount.id));
      return updated;
    });

    form.reset();
    setShowForm(false);
  };

  const handleSelect = (id) => {
    setSelectedId(String(id));
  };

  return (
    <div style={pageStyle}>
      <div style={containerStyle}>
        {/* <Navbar /> */}
        <h1 style={titleStyle}>💳 Manage Bank Accounts</h1>
        {/* Cards grid */}
        {accounts.length > 0 && (
          <div style={gridStyle}>
            {accounts.map((acc) => {
              const isSelected = String(acc.id) === String(selectedId);
              return (
                <div
                  key={acc.id}
                  style={{
                    ...cardStyle,
                    border: isSelected ? "2px solid #ffd700" : "1px solid rgba(255,255,255,0.08)",
                    boxShadow: isSelected ? "0 14px 40px rgba(255,215,0,0.08)" : cardStyle.boxShadow,
                    transform: isSelected ? "translateY(-4px)" : "none",
                    cursor: "pointer",
                  }}
                  onClick={() => handleSelect(acc.id)}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "12px" }}>
                    <div>
                      <FaUniversity size={28} style={{ color: "#ffd700", marginBottom: 8 }} />
                      <h3 style={{ margin: "0 0 6px 0" }}>{acc.bankName}</h3>
                      <p style={{ margin: "4px 0", color: "rgba(255,255,255,0.9)" }}><strong>Type:</strong> {acc.type}</p>
                      <p style={{ margin: "4px 0", color: "rgba(255,255,255,0.9)" }}><strong>Holder:</strong> {acc.holderName}</p>
                      <p style={{ margin: "4px 0", color: "rgba(255,255,255,0.85)" }}><strong>IFSC:</strong> {acc.ifsc}</p>
                      <p style={{ margin: "4px 0 0 0", color: "rgba(255,255,255,0.85)" }}><strong>Account:</strong> {acc.accountNumber}</p>
                    </div>

                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
                      <input
                        type="radio"
                        name="selectedBank"
                        checked={isSelected}
                        onChange={() => handleSelect(acc.id)}
                        aria-label={`Select ${acc.bankName}`}
                        style={{ width: 20, height: 20, accentColor: "#ffd700", cursor: "pointer" }}
                        onClick={(e) => e.stopPropagation()} // stop card click double trigger
                      />
                      {isSelected && <span style={{ fontSize: 12, color: "#ffd700" }}>Default</span>}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Form (visible when showForm) */}
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
              <button type="submit" style={saveBtnStyle}>Save Account</button>
              <button
                type="button"
                onClick={() => {
                  // if no accounts exist, keep the form visible; otherwise hide
                  setShowForm(false);
                }}
                style={cancelBtnStyle}
              >
                Cancel
              </button>
            </div>
          </form>
        )}

        {/* Plus button to add more */}
        {!showForm && (
          <div style={{ textAlign: "center", marginTop: 28 }}>
            <button
              title="Add bank"
              onClick={() => setShowForm(true)}
              style={plusBtnStyle}
            >
              <FaPlus color="#000" />
            </button>
            <div style={{ marginTop: 10, color: "rgba(255,255,255,0.8)" }}>Add another account</div>
          </div>
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
  fontFamily: "Inter, ui-sans-serif, system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial",
};

const containerStyle = {
  width: "100%",
  maxWidth: 1100,
};

const titleStyle = {
  textAlign: "center",
  fontSize: 34,
  marginBottom: 22,
  fontWeight: 700,
  background: "linear-gradient(90deg,#fff,#ffd700)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
};

const gridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
  gap: 18,
  marginBottom: 18,
};

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
  padding: "10px 12px",
  borderRadius: 8,
  border: "1px solid rgba(255,255,255,0.12)",
  background: "rgba(0,0,0,0.2)",
  color: "#fff",
  outline: "none",
  fontSize: 14,
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
