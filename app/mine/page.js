"use client";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { FaPlus, FaUniversity } from "react-icons/fa";
import toast from "react-hot-toast";
import { Button } from "react-bootstrap";
import { decryptData, encryptData } from "../utils/crypo";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const API_URL =
  "https://primexchange-apis-git-main-ghostnodedevs-projects.vercel.app/account";

export default function BankManager() {
  const [accounts, setAccounts] = useState([]);
  const [showForm, setShowForm] = useState(true);
  const [selectedId, setSelectedId] = useState(null);
  const [amount, setAmount] = useState("");
  const [sold, setSold] = useState(false);
  const [totalAmount, setTotalAmount] = useState("0.00");
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [storedEmail, setStoredEmail] = useState(null);
  const [lastInvoice, setLastInvoice] = useState(null);

  // Auth & email
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    setIsAuthenticated(!!token);
    const email = localStorage.getItem("userEmail");
    if (email) setStoredEmail(email);
  }, []);

  // Fetch accounts
  useEffect(() => {
    if (!storedEmail) return;
    const fetchAccounts = async () => {
      try {
        const res = await fetch(
          `https://primexchange-apis-git-main-ghostnodedevs-projects.vercel.app/gacc?email=${encodeURIComponent(
            storedEmail
          )}`
        );
        if (!res.ok)
          throw new Error(`HTTP error! status: ${res.status}`);
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

  // Save selected bank
  useEffect(() => {
    if (selectedId !== null) {
      Cookies.set("selectedBank", String(selectedId), { expires: 7 });
    } else {
      Cookies.remove("selectedBank");
    }
  }, [selectedId]);

  const handleSelect = (id) => setSelectedId(String(id));

const handleSell = async () => {
  if (accounts.length === 0) {
    toast.error("Please add a bank account first!");
    return;
  }
  if (!selectedId) {
    toast.error("Select a bank account to sell from!");
    return;
  }

  // balance from cookies
  const encryptedAmount = Cookies.get("depositAmount");
  let availableBalance = 0;
  if (encryptedAmount) {
    try {
      const decrypted = decryptData(encryptedAmount);
      const parsed = parseFloat(decrypted);
      if (!isNaN(parsed)) {
        availableBalance = parsed;
        setTotalAmount(parsed.toFixed(2));
      }
    } catch (err) {
      console.error("Failed to decrypt amount:", err);
    }
  }

  if (!amount) {
    toast.error("Enter amount first!");
    return;
  }
  const sellAmount = parseFloat(amount);
  if (isNaN(sellAmount) || sellAmount <= 0) {
    toast.error("Invalid amount!");
    return;
  }
  if (sellAmount > availableBalance) {
    toast.error("Insufficient balance!");
    return;
  }

  const newBalance = availableBalance - sellAmount;
  const encryptedNewBalance = encryptData(newBalance.toString());
  Cookies.set("depositAmount", encryptedNewBalance, {
    expires: 1,
    secure: true,
    sameSite: "Strict",
  });
  setTotalAmount(newBalance.toFixed(2));
  setSold(true);

  const selectedAcc = accounts.find(
    (acc) => String(acc.id) === String(selectedId)
  );
  if (!selectedAcc) {
    toast.error("No valid account found!");
    return;
  }

  // 🔑 stable ID = accountno + email (avoids duplicates in UI)
  const stableId = `${selectedAcc.accountno}-${storedEmail}`;

  const updatedAcc = {
    ...selectedAcc,
    id: stableId,
    sellamount: sellAmount,
    amount: newBalance,
    email: storedEmail || "unknown",
  };

  try {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedAcc),
    });
    if (!res.ok) throw new Error("Failed to update sell");

    // update state but filter duplicates (only 1 per accountno)
    setAccounts((prev) => {
      const merged = [...prev.filter((a) => a.accountno !== selectedAcc.accountno), updatedAcc];
      const unique = merged.reduce((map, acc) => {
        map[acc.accountno] = acc; // latest wins
        return map;
      }, {});
      return Object.values(unique);
    });

    toast.success("Sell Successful & Saved to DB!");
    setLastInvoice({
      account: updatedAcc,
      sellAmount,
      newBalance,
      date: new Date().toLocaleString(),
    });
  } catch (err) {
    console.error(err);
    toast.error("Failed to update DB");
  }
};

  const handleDownloadInvoice = () => {
    if (!lastInvoice) return;
    const doc = new jsPDF();
    doc.text("🧾 Primexchange", 14, 20);
    doc.setFontSize(14);
    doc.text("Transaction Invoice", 14, 30);
    doc.setFontSize(11);
    doc.text(`Date: ${lastInvoice.date}`, 14, 40);

    autoTable(doc, {
      startY: 50,
      head: [["Field", "Value"]],
      body: [
        ["Account Holder", lastInvoice.account.holdername],
        ["Bank Name", lastInvoice.account.bankname],
        ["Account Number", lastInvoice.account.accountno],
        ["IFSC", lastInvoice.account.ifsc],
        ["Sell Amount", `$${lastInvoice.sellAmount.toFixed(2)}`],
        ["Remaining Balance", `$${lastInvoice.newBalance.toFixed(2)}`],
      ],
      theme: "grid",
      styles: { halign: "left", cellPadding: 3, fontSize: 11 },
      headStyles: {
        fillColor: [255, 215, 0],
        textColor: "#000",
        fontStyle: "bold",
      },
      margin: { left: 14, right: 14 },
    });

    doc.setFontSize(12);
    doc.setTextColor(0, 128, 0);
    doc.text(
      "✔ Transaction Completed Successfully",
      14,
      doc.lastAutoTable.finalY + 15
    );
    doc.save(`Primexchange_Invoice_${Date.now()}.pdf`);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const encryptedAmount = Cookies.get("depositAmount");
    let availableBalance = 0;
    if (encryptedAmount) {
      try {
        const decrypted = decryptData(encryptedAmount);
        const parsed = parseFloat(decrypted);
        if (!isNaN(parsed)) {
          availableBalance = parsed;
          setTotalAmount(parsed.toFixed(2));
        }
      } catch (err) {
        console.error("Failed to decrypt amount:", err);
      }
    }

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
      ifsc,
      bankname: bankName,
      accounttype: type,
      sellamount: 0,
      email: storedEmail || "unknown",
      amount: availableBalance,
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
              const isSelected = String(acc.id) === String(selectedId || acc.id);
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
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: 12,
                      }}
                    >
                      <input
                        type="radio"
                        name="selectedBank"
                        checked={isSelected}
                        onChange={() => handleSelect(acc.id)}
                        style={{
                          width: 20,
                          height: 20,
                          accentColor: "#ffd700",
                          cursor: "pointer",
                        }}
                        onClick={(e) => e.stopPropagation()}
                      />
                      {isSelected && (
                        <span style={{ fontSize: 12, color: "#ffd700" }}>
                          Default
                        </span>
                      )}
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
              <input
                name="bankName"
                style={inputFieldStyle}
                placeholder="e.g., HDFC Bank"
                required
              />
            </div>
            <div style={rowStyle}>
              <label style={labelStyle}>Account Type</label>
              <select
                name="type"
                style={inputFieldStyle}
                defaultValue="Savings"
                required
              >
                <option value="Savings">Savings</option>
                <option value="Current">Current</option>
                <option value="Salary">Salary</option>
              </select>
            </div>
            <div style={rowStyle}>
              <label style={labelStyle}>Holder Name</label>
              <input
                name="holderName"
                style={inputFieldStyle}
                placeholder="Account holder full name"
                required
              />
            </div>
            <div style={rowStyle}>
              <label style={labelStyle}>IFSC Code</label>
              <input
                name="ifsc"
                style={inputFieldStyle}
                placeholder="e.g., HDFC0001234"
                required
              />
            </div>
            <div style={rowStyle}>
              <label style={labelStyle}>Account Number</label>
              <input
                name="accountNumber"
                style={inputFieldStyle}
                placeholder="Enter account number"
                required
              />
            </div>
            <div style={{ display: "flex", gap: 12, marginTop: 14 }}>
              <button type="submit" style={saveBtnStyle}>
                Save Account
              </button>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                style={cancelBtnStyle}
              >
                Cancel
              </button>
            </div>
          </form>
        )}

        {/* Add More + Sell Section */}
        {!showForm && (
          <>
            <div style={{ textAlign: "center", marginTop: 28 }}>
              <button
                title="Add bank"
                onClick={() => setShowForm(true)}
                style={plusBtnStyle}
              >
                <FaPlus color="#000" />
              </button>
              <div style={{ marginTop: 10, color: "rgba(255,255,255,0.8)" }}>
                Add another account
              </div>
            </div>

            {/* Sell Section */}
            <div style={{ marginTop: 20, textAlign: "center" }}>
              <label
                style={{ display: "block", marginBottom: 8, fontWeight: 600 }}
              >
                Enter Amount to Sell
              </label>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  gap: 10,
                  alignItems: "center",
                }}
              >
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
                    <div
                      style={{
                        minWidth: 100,
                        display: "flex",
                        justifyContent: "center",
                      }}
                    >
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
                  <>
                    <span
                      style={{
                        color: "#22c55e",
                        fontWeight: 600,
                        fontSize: 16,
                      }}
                    >
                      ✅ Sold
                    </span>
                    <button
                      onClick={handleDownloadInvoice}
                      style={{
                        background: "#ffd700",
                        color: "#000",
                        border: "none",
                        padding: "10px 14px",
                        borderRadius: 8,
                        fontWeight: 600,
                        cursor: "pointer",
                      }}
                    >
                      Save Invoice
                    </button>
                  </>
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
/* ---------------- styles ---------------- */
const pageStyle = {
  minHeight: "100vh",
  background: "linear-gradient(135deg, #0f1724 0%, #2b2445 50%, #6b4b8a 100%)",
  color: "#fff",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "20px", // reduced for mobile
};

const containerStyle = {
  width: "100%",
  maxWidth: "900px",
  background: "rgba(255,255,255,0.05)",
  padding: "20px",
  borderRadius: "20px",
  boxShadow: "0 20px 40px rgba(0,0,0,0.3)",
};

const titleStyle = {
  textAlign: "center",
  fontSize: "1.6rem", // smaller for mobile
  fontWeight: "bold",
  marginBottom: "20px",
  color: "#ffd700",
};

const gridStyle = {
  display: "grid",
  gridTemplateColumns: "1fr", // default stack
  gap: "16px",
  marginBottom: "30px",
};

// Responsive breakpoint
if (typeof window !== "undefined" && window.innerWidth > 600) {
  gridStyle.gridTemplateColumns = "repeat(auto-fit, minmax(260px, 1fr))";
}

const cardStyle = {
  background: "rgba(255,255,255,0.08)",
  borderRadius: "16px",
  padding: "12px",
  transition: "0.3s",
  boxShadow: "0 8px 24px rgba(0,0,0,0.2)",
  wordWrap: "break-word", // prevents long numbers breaking layout
};


const formContainerStyle = {
  background: "rgba(255,255,255,0.1)",
  padding: "20px",
  borderRadius: "16px",
  marginTop: "20px",
};

const rowStyle = {
  marginBottom: "14px",
  display: "flex",
  flexDirection: "column",
};

const labelStyle = {
  marginBottom: "6px",
  fontWeight: "600",
};

const inputFieldStyle = {
  padding: "10px 12px",
  borderRadius: "8px",
  border: "1px solid rgba(255,255,255,0.3)",
  outline: "none",
  fontSize: "14px",
  width: "100%",
  color: "#000",
};

const saveBtnStyle = {
  background: "#22c55e",
  color: "#fff",
  border: "none",
  padding: "10px 18px",
  borderRadius: "8px",
  fontWeight: "600",
  cursor: "pointer",
  flex: 1,
};

const cancelBtnStyle = {
  background: "#f87171",
  color: "#fff",
  border: "none",
  padding: "10px 18px",
  borderRadius: "8px",
  fontWeight: "600",
  cursor: "pointer",
  flex: 1,
};

const plusBtnStyle = {
  background: "#ffd700",
  border: "none",
  borderRadius: "50%",
  padding: "14px",
  cursor: "pointer",
  boxShadow: "0 6px 14px rgba(0,0,0,0.3)",
};
