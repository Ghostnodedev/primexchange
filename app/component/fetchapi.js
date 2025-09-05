/* eslint-disable @next/next/no-img-element */
'use client';
import React, { useEffect, useState } from "react";

function generateRandomTrend(length = 7) {
  let values = [Math.random() * 100];
  for (let i = 1; i < length; i++) {
    values.push(values[i - 1] + (Math.random() * 20 - 10));
  }
  return values;
}

function CryptoCard({ symbol, name, price_change_percentage_24h, current_price, image, trend }) {
  const isPositive = price_change_percentage_24h >= 0;
  const strokeColor = isPositive ? "url(#positiveGradient)" : "url(#negativeGradient)";

  function generatePath(data, width, height) {
    const max = Math.max(...data);
    const min = Math.min(...data);
    const step = width / (data.length - 1);

    return data
      .map((point, i) => {
        const x = i * step;
        const y = height - ((point - min) / (max - min || 1)) * height;
        return `${i === 0 ? 'M' : 'L'} ${x},${y}`;
      })
      .join(' ');
  }

  return (
    <div
      style={{
        background: "linear-gradient(135deg, #080234ff, #055671ff)",
        borderRadius: "20px",
        padding: "22px",
        color: "#f3e5e5ff",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        boxShadow: "0 8px 24px rgba(15, 0.2, 0.5, 0.9)",
        backdropFilter: "blur(15px)",
        transition: "transform 0.5s ease, box-shadow 0.5s ease",
        cursor: "pointer",
        height: "200px",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-6px) scale(1.03)";
        e.currentTarget.style.boxShadow = "0 12px 32px rgba(99,102,241,0.6)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0) scale(1)";
        e.currentTarget.style.boxShadow = "0 8px 24px rgba(0,0,0,0.6)";
      }}
    >
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        <img src={image} alt={name} style={{ width: 40, height: 40 }} />
        <div>
          <div style={{ fontWeight: 700, fontSize: "1.1rem" }}>{name}</div>
          <div style={{ fontSize: "0.9rem", color: "#94a3b8" }}>{symbol.toUpperCase()}</div>
        </div>
      </div>

      {/* Price & Change */}
      <div style={{ marginTop: "10px" }}>
        <div style={{ fontSize: "1.6rem", fontWeight: 800, color: "#f8fafc" }}>
          ${current_price.toLocaleString()}
        </div>
        <div
          style={{
            fontSize: "1rem",
            fontWeight: 600,
            color: isPositive ? "#00eb56ff" : "#d41212ff",
            marginTop: "5px",
          }}
        >
          {isPositive ? "+" : ""}
          {price_change_percentage_24h?.toFixed(2)}%
        </div>
      </div>

      {/* Trend Chart */}
      <svg viewBox="0 0 100 30" width="100%" height="40px">
        <defs>
          <linearGradient id="positiveGradient" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#22c55e" />
            <stop offset="100%" stopColor="#86efac" />
          </linearGradient>
          <linearGradient id="negativeGradient" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#e82323ff" />
            <stop offset="100%" stopColor="#f67c7cff" />
          </linearGradient>
        </defs>
        <path
          d={generatePath(trend, 100, 30)}
          stroke={strokeColor}
          strokeWidth="2.5"
          fill="none"
        />
      </svg>
    </div>
  );
}

export default function CryptoCardGrid() {
  const [cryptoData, setCryptoData] = useState([]);
  const [loading, setLoading] = useState(true);

  // Get a consistent daily seed (like "2025-09-06")
  const getTodayKey = () => {
    const now = new Date();
    return `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`;
  };

  useEffect(() => {
    const fetchAndShuffle = async () => {
      setLoading(true);

      const todayKey = getTodayKey();
      const savedData = localStorage.getItem("dailyCryptoData");
      const savedDate = localStorage.getItem("dailyCryptoDate");

      // Use cached data if it exists and is from today
      if (savedData && savedDate === todayKey) {
        setCryptoData(JSON.parse(savedData));
        setLoading(false);
        return;
      }

      try {
        const res = await fetch("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd");
        const data = await res.json();

        // Shuffle using today's date as seed
        const shuffled = [...data].sort(() => Math.random() - 0.5).slice(0, 16);

        // Add fake trend data
        const withTrends = shuffled.map((crypto) => ({
          ...crypto,
          trend: generateRandomTrend(7),
        }));

        // Save to localStorage
        localStorage.setItem("dailyCryptoData", JSON.stringify(withTrends));
        localStorage.setItem("dailyCryptoDate", todayKey);

        setCryptoData(withTrends);
      } catch (err) {
        console.error("Error fetching crypto data", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAndShuffle();
  }, []);

  return (
    <>
      <h1 style={{
        textAlign: "center",
        margin: "10px 0 20px 0",
        fontSize: "2rem",
        fontWeight: "700",
        color: "#0f172a"
      }}>
        Cryptos Market
      </h1>

      <div
        style={{
          minHeight: "100vh",
          width: "100%",
          padding: "20px 20px 40px 20px",
          boxSizing: "border-box",
          display: "flex",
          justifyContent: "center",
        }}
      >
        {loading ? (
          <div style={{ color: "#555", fontSize: "1.2rem" }}>Loading...</div>
        ) : (
          <div
            style={{
              width: "100%",
              maxWidth: "1200px",
              display: "grid",
              gap: "15px",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            }}
          >
            {cryptoData.map((crypto) => (
              <CryptoCard key={crypto.id} {...crypto} />
            ))}
          </div>
        )}
      </div>
    </>
  );
}
