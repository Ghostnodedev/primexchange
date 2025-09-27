/* eslint-disable @next/next/no-img-element */
'use client';
import React, { useEffect, useState, useRef } from "react";
import Cookies from "js-cookie";
function generateRandomTrend(length = 7) {
  let values = [Math.random() * 100];
  for (let i = 1; i < length; i++) {
    values.push(values[i - 1] + (Math.random() * 20 - 10));
  }
  return values;
}

function CryptoCard({ symbol, name, price_change_percentage_24h, current_price, image, trend }) {
  const cardRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
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

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={cardRef}
      style={{
        background: "linear-gradient(135deg, #080234ff, #055671ff)",
        borderRadius: "20px",
        padding: "22px",
        color: "#f3e5e5ff",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        boxShadow: isVisible
          ? "0 12px 32px rgba(99,102,241,0.6)"
          : "0 8px 24px rgba(15, 0.2, 0.5, 0.9)",
        backdropFilter: "blur(15px)",
        cursor: "pointer",
        height: "200px",
        transform: isVisible ? "translateY(0) scale(1)" : "translateY(20px) scale(0.95)",
        opacity: isVisible ? 1 : 0,
        transition: "opacity 0.7s ease, transform 0.7s ease, box-shadow 0.5s ease",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-6px) scale(1.05)";
        e.currentTarget.style.boxShadow = "0 18px 40px rgba(99,102,241,0.9)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0) scale(1)";
        e.currentTarget.style.boxShadow = isVisible
          ? "0 12px 32px rgba(99,102,241,0.6)"
          : "0 8px 24px rgba(15, 0.2, 0.5, 0.9)";
      }}
    >
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", gap: "12px", overflow: "hidden" }}>
        <img src={image} alt={name} style={{ width: 40, height: 40, flexShrink: 0 }} />
        <div style={{ minWidth: 0 }}>
          <div
            style={{
              fontWeight: 700,
              fontSize: "1.1rem",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
              maxWidth: "150px",
            }}
            title={name}
          >
            {name}
          </div>
          <div style={{ fontSize: "0.9rem", color: "#94a3b8", textTransform: "uppercase" }}>{symbol}</div>
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
      <svg viewBox="0 0 100 30" width="100%" height="40px" style={{ marginTop: "10px" }}>
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
          style={{ transition: "stroke-dashoffset 1.5s ease" }}
        />
      </svg>
    </div>
  );
}

export default function CryptoCardGrid() {
  const [cryptoData, setCryptoData] = useState([]);
  const [loading, setLoading] = useState(true);

const getTodayKey = () => {
  const now = new Date();
  return `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`;
};

useEffect(() => {
  const fetchAndShuffle = async () => {
    setLoading(true);

    const todayKey = getTodayKey();
    const savedData = Cookies.get("dailyCryptoData");
    const savedDate = Cookies.get("dailyCryptoDate");

    if (savedData && savedDate === todayKey) {
      setCryptoData(JSON.parse(savedData));
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd");
      const data = await res.json();

      const shuffled = [...data].sort(() => Math.random() - 0.5).slice(0, 16);

      const withTrends = shuffled.map((crypto) => ({
        ...crypto,
        trend: generateRandomTrend(7),
      }));

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
      <h1
        style={{
          textAlign: "center",
          margin: "10px 0 20px 0",
          fontSize: "2rem",
          fontWeight: "700",
          color: "#0f172a",
        }}
      >
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
