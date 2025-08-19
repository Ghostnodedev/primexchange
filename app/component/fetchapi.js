/* eslint-disable @next/next/no-img-element */
'use client'
import React, { useState, useEffect } from "react";

const cryptos = [
  // same crypto array as before...
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
    symbol: "USDC",
    name: "USDC",
    changePercent: 0.0,
    volume: 7201867560,
    price: 1.0,
    icon: "https://cryptoicons.org/api/icon/usdc/64",
  },
  {
    symbol: "LDO",
    name: "Lido Staked Ether",
    changePercent: 2.35,
    volume: 59000792,
    price: 4541.49,
    icon: "https://cryptologos.cc/logos/lido-dao-lido-logo.png",
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
  {
    symbol: "DOT",
    name: "Polkadot",
    changePercent: -1.02,
    volume: 123456789,
    price: 30.12,
    icon: "https://cryptoicons.org/api/icon/dot/64",
  },
  {
    symbol: "AVAX",
    name: "Avalanche",
    changePercent: 0.72,
    volume: 654321987,
    price: 60.45,
    icon: "https://cryptoicons.org/api/icon/avax/64",
  },
  {
    symbol: "MATIC",
    name: "Polygon",
    changePercent: 1.58,
    volume: 765432198,
    price: 1.25,
    icon: "https://cryptoicons.org/api/icon/matic/64",
  },
  {
    symbol: "SHIB",
    name: "Shiba Inu",
    changePercent: -0.33,
    volume: 1112131415,
    price: 0.000028,
    icon: "https://cryptoicons.org/api/icon/shib/64",
  },
  {
    symbol: "TRX",
    name: "Tron",
    changePercent: 0.45,
    volume: 543216789,
    price: 0.09,
    icon: "https://cryptoicons.org/api/icon/trx/64",
  },
];

function shuffleArray(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export default function CryptoCardGrid() {
  const [shuffledCryptos, setShuffledCryptos] = useState([]);

  useEffect(() => {
    setShuffledCryptos(shuffleArray(cryptos).slice(0, 12));
  }, []);

  return (
    <div
      style={{
        maxWidth: "1200px",
        margin: "0 auto",
        padding: "0 20px", 
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)", // exactly 3 columns
        gap: "16px",
        backgroundColor: "#f5f5f7",
        minHeight: "100vh",
        paddingTop: "20px",
      }}
    >
      {shuffledCryptos.map(({ symbol, name, changePercent, volume, price, icon }) => {
        const isPositive = changePercent >= 0;
        return (
          <div
            key={symbol}
            style={{
              background: "linear-gradient(190deg, blue, black)",
              borderRadius: "10px",
              padding: "15px 20px",
              color: "#eee",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              height: "140px",
              boxShadow: "0 4px 10px rgba(0,0,0,0.3)",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <img
                src={icon}
                alt={name}
                style={{ width: 40, height: 40, borderRadius: "50%", backgroundColor: "#000" }}
                // onError={(e) => (e.currentTarget.src = "/placeholder.png")}
              />
              <h3 style={{ margin: 0, fontSize: "1.1rem" }}>{name}</h3>
            </div>

            <div style={{ marginTop: 10 }}>
              <p
                style={{
                  margin: "0 0 5px 0",
                  fontWeight: "600",
                  color: isPositive ? "#4caf50" : "#f44336",
                  fontSize: "1rem",
                }}
              >
                {isPositive ? "+" : ""}
                {changePercent.toFixed(2)}%
              </p>
              <p style={{ margin: "2px 0", fontSize: "0.85rem" }}>
                Volume: {volume.toLocaleString()}
              </p>
              <p style={{ margin: "2px 0", fontSize: "0.85rem" }}>
                Price: ${price.toLocaleString()}
              </p>
            </div>

            <div
              style={{
                height: 6,
                backgroundColor: "#444",
                borderRadius: 3,
                overflow: "hidden",
                marginTop: "auto",
              }}
            >
              <div
                style={{
                  width: `${Math.min(Math.abs(changePercent) * 20, 100)}%`,
                  height: "100%",
                  backgroundColor: isPositive ? "#4caf50" : "#f44336",
                  transition: "width 0.3s ease",
                }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
