/* eslint-disable @next/next/no-img-element */
// app/component/CryptoCardGrid.jsx
'use client'
import React, { useEffect, useState } from "react";

// --- Sample crypto data ---
const cryptos = [
  {
    symbol: "BTC",
    name: "Bitcoin",
    changePercent: 0.59,
    volume: 2117026162,
    price: 118387,
    icon: "https://cryptoicons.org/api/icon/btc/64",
  },
  {
    symbol: "ETH",
    name: "Ethereum",
    changePercent: 2.39,
    volume: 2118611123,
    price: 4551.59,
    icon: "https://cryptoicons.org/api/icon/eth/64",
  },
  {
    symbol: "XRP",
    name: "XRP",
    changePercent: -0.22,
    volume: 3764682331,
    price: 3.14,
    icon: "https://cryptoicons.org/api/icon/xrp/64",
  },
  {
    symbol: "USDT",
    name: "Tether",
    changePercent: -0.01,
    volume: 59906561452,
    price: 1.0,
    icon: "https://cryptoicons.org/api/icon/usdt/64",
  },
  {
    symbol: "BNB",
    name: "BNB",
    changePercent: 2.55,
    volume: 1231502510,
    price: 857.59,
    icon: "https://cryptoicons.org/api/icon/bnb/64",
  },
  {
    symbol: "SOL",
    name: "Solana",
    changePercent: 2.91,
    volume: 4262648584,
    price: 193.52,
    icon: "https://cryptoicons.org/api/icon/sol/64",
  },
  {
    symbol: "DOGE",
    name: "Dogecoin",
    changePercent: 0.94,
    volume: 2329669034,
    price: 0.24,
    icon: "https://cryptoicons.org/api/icon/doge/64",
  },
  {
    symbol: "ADA",
    name: "Cardano",
    changePercent: 1.15,
    volume: 987654321,
    price: 2.15,
    icon: "https://cryptoicons.org/api/icon/ada/64",
  },
  
];

// --- Dummy trend generator ---
function generateRandomTrend(length = 7) {
  let values = [Math.random() * 100];
  for (let i = 1; i < length; i++) {
    values.push(values[i - 1] + (Math.random() * 20 - 10));
  }
  return values;
}

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

function CryptoCard({ symbol, name, changePercent, price, icon, trend }) {
  const isPositive = changePercent >= 0;
  const strokeColor = isPositive ? "#00ff99" : "#ff4d4f";

  return (
    <>
    <div
      style={{
        background: "#061e59ff",
        borderRadius: "16px",
        padding: "20px",
        color: "#fff",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-evenly",
        boxShadow: "2px 2px 2px 2px rgba(1, 1, 1, 0.12)",
        transition: "transform 0.3s",
        cursor: "pointer",
        height: "210px",
      }}
      className="card"
    >
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <img src={icon} alt={name} style={{ width: 32, height: 32 }} />
        <div>
          <div style={{ fontWeight: 600 }}>{name}</div>
          <div style={{ fontSize: "0.9rem", color: "#a0aec0" }}>{symbol}</div>
        </div>
      </div>

      <div style={{ marginTop: "12px" }}>
        <div style={{ fontSize: "1.4rem", fontWeight: 700 }}>
          ${price.toLocaleString()}
        </div>
        <div
          style={{
            fontSize: "0.95rem",
            fontWeight: 600,
            color: strokeColor,
            marginTop: "4px",
          }}
        >
          {isPositive ? "+" : ""}
          {changePercent}%
        </div>
      </div>

      <svg viewBox="0 0 100 30" width="100%" height="30px">
        <path
          d={generatePath(trend, 100, 30)}
          stroke={strokeColor}
          strokeWidth="2"
          fill="none"
        />
      </svg>
    </div>
    </>
  );
}

export default function CryptoCardGrid() {
  const [cryptoData, setCryptoData] = useState([]);

  useEffect(() => {
    const withTrends = cryptos.map((c) => ({
      ...c,
      trend: generateRandomTrend(7),
    }));
    setCryptoData(withTrends);
  }, []);

  return (
    <>
    <h1 style={{ textAlign: "center", margin: "20px 0" }}>Cryptos Market</h1>
    <div
      style={{
        backgroundColor: "#ffffffff",
        minHeight: "100vh",
        width: "100%",
        padding: "40px 20px",
        boxSizing: "border-box",
        display: "flex",
        justifyContent: "center",
        boxShadow: "20px 20px 20px 20px rgba(1, 1, 1, 0.12)",

      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "1200px",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "30px",
        }}
      >
        {cryptoData.map((crypto) => (
          <CryptoCard key={crypto.symbol} {...crypto} />
        ))}
      </div>
    </div>
    </>
  );
}
