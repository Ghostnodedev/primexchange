"use client";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function HistoryPage() {
    const [accounts, setAccounts] = useState([]);
    const [email, setEmail] = useState(null);
    const API_URL = "https://primexchange-apis-git-main-ghostnodedevs-projects.vercel.app/gacc";

    // Get email from localStorage
    useEffect(() => {
        const storedEmail = localStorage.getItem("userEmail");
        if (storedEmail) {
            setEmail(storedEmail);
        } else {
            toast.error("User not logged in.");
        }
    }, []);

    // Fetch account history
    useEffect(() => {
        if (!email) return;
        const fetchAccounts = async () => {
            try {
                const res = await fetch(`${API_URL}?email=${encodeURIComponent(email)}`);
                if (!res.ok) throw new Error(`Error: ${res.status}`);
                const data = await res.json();
                setAccounts(data.data || []);
            } catch (err) {
                console.error("Failed to fetch accounts:", err);
                toast.error("Failed to load account history.");
            }
        };
        fetchAccounts();
    }, [email]);

    const prefix = "ULTTL";
    function generate10DigitNumber() {
        let num = "";
        for (let i = 0; i < 10; i++) {
            num += Math.floor(Math.random() * 10);
        }
        return num;
    }

    return (
        <div style={pageStyle}>
            <div style={containerStyle}>
                <h1 style={titleStyle}>📜 Transaction History</h1>
                {accounts.length === 0 ? (
                    <p style={{ color: "#ccc", textAlign: "center" }}>No records found.</p>
                ) : (
                    <div className="table-responsive" style={{ overflowX: "auto" }}>
                        <table
                            className="table table-bordered table-hover table-striped"
                            style={{ color: "#fff", backgroundColor: "#efeff4ff" }}
                        >
                            <thead className="table-light text-white">
                                <tr>
                                    <th>#</th>
                                    <th>RID</th>
                                    <th>Holder Name</th>
                                    <th>Bank Name</th>
                                    <th>Sell Amount (USD)</th>
                                    <th>Sell Amount (INR)</th>
                                </tr>
                            </thead>
                            <tbody>
                                {accounts
                                    .filter((acc) => parseFloat(acc.sellamount) !== 0) // filter out sellamount === 0
                                    .map((acc, index) => {
                                        const id = `${prefix}${generate10DigitNumber()}`;
                                        const usd = parseFloat(acc.sellamount || 0);
                                        const inr = usd * 92; // conversion rate (1 USD = ₹92)

                                        return (
                                            <tr key={acc.id || index}>
                                                <td>{index + 1}</td>
                                                <td>{id}</td>
                                                <td>{acc.holdername || "-"}</td>
                                                <td>{acc.bankname || "-"}</td>
                                                <td>${usd.toFixed(2)}</td>
                                                <td>₹{inr.toLocaleString("en-IN", { minimumFractionDigits: 2 })}</td>
                                            </tr>
                                        );
                                    })}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
}

/* ---------------- Styles ---------------- */
const pageStyle = {
    minHeight: "100vh",
    background: "#000", // plain black background
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
    padding: "40px 20px",
    color: "#fff", // global white text
};
const containerStyle = {
    width: "100%",
    maxWidth: "1000px",
    background: "#111", // dark container
    borderRadius: "16px",
    padding: "30px",
    boxShadow: "0 20px 40px rgba(255,255,255,0.05)",
};
const titleStyle = {
    textAlign: "center",
    color: "#ffd700",
    marginBottom: "24px",
};
