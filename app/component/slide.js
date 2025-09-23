import React, { useEffect, useRef, useState } from "react";
import { Container } from "react-bootstrap";

const phoneData = [
  // --- 80 Indian numbers (80%) ---
  { phone: "+91 98* *** *001", amount: "$2000" },
  { phone: "+91 97* *** *234", amount: "$1500" },
  { phone: "+91 96* *** *567", amount: "$3000" },
  { phone: "+91 95* *** *890", amount: "$4500" },
  { phone: "+91 94* *** *123", amount: "$1200" },
  { phone: "+91 93* *** *234", amount: "$2500" },
  { phone: "+91 92* *** *345", amount: "$1000" },
  { phone: "+91 91* *** *456", amount: "$3200" },
  { phone: "+91 90* *** *567", amount: "$2700" },
  { phone: "+91 89* *** *678", amount: "$800" },
  { phone: "+91 88* *** *789", amount: "$900" },
  { phone: "+91 87* *** *890", amount: "$1100" },
  { phone: "+91 86* *** *901", amount: "$1400" },
  { phone: "+91 85* *** *012", amount: "$1600" },
  { phone: "+91 84* *** *123", amount: "$1300" },
  { phone: "+91 83* *** *234", amount: "$1800" },
  { phone: "+91 82* *** *345", amount: "$2200" },
  { phone: "+91 81* *** *456", amount: "$1900" },
  { phone: "+91 80* *** *567", amount: "$2100" },
  { phone: "+91 79* *** *678", amount: "$2300" },
  { phone: "+91 78* *** *789", amount: "$2500" },
  { phone: "+91 77* *** *890", amount: "$2700" },
  { phone: "+91 76* *** *901", amount: "$2900" },
  { phone: "+91 75* *** *012", amount: "$3100" },
  { phone: "+91 74* *** *123", amount: "$3300" },
  { phone: "+91 73* *** *234", amount: "$3500" },
  { phone: "+91 72* *** *345", amount: "$3700" },
  { phone: "+91 71* *** *456", amount: "$3900" },
  { phone: "+91 70* *** *567", amount: "$4100" },
  { phone: "+91 69* *** *678", amount: "$4300" },
  { phone: "+91 68* *** *789", amount: "$4500" },
  { phone: "+91 67* *** *890", amount: "$4700" },
  { phone: "+91 66* *** *901", amount: "$4900" },
  { phone: "+91 65* *** *012", amount: "$5100" },
  { phone: "+91 64* *** *123", amount: "$5300" },
  { phone: "+91 63* *** *234", amount: "$5500" },
  { phone: "+91 62* *** *345", amount: "$5700" },
  { phone: "+91 61* *** *456", amount: "$5900" },
  { phone: "+91 60* *** *567", amount: "$6100" },
  { phone: "+91 59* *** *678", amount: "$6300" },
  { phone: "+91 58* *** *789", amount: "$6500" },
  { phone: "+91 57* *** *890", amount: "$6700" },
  { phone: "+91 56* *** *901", amount: "$6900" },
  { phone: "+91 55* *** *012", amount: "$7100" },
  { phone: "+91 54* *** *123", amount: "$7300" },
  { phone: "+91 53* *** *234", amount: "$7500" },
  { phone: "+91 52* *** *345", amount: "$7700" },
  { phone: "+91 51* *** *456", amount: "$7900" },
  { phone: "+91 50* *** *567", amount: "$8100" },
  { phone: "+91 49* *** *678", amount: "$8300" },
  { phone: "+91 48* *** *789", amount: "$8500" },
  { phone: "+91 47* *** *890", amount: "$8700" },
  { phone: "+91 46* *** *901", amount: "$8900" },
  { phone: "+91 45* *** *012", amount: "$9100" },
  { phone: "+91 44* *** *123", amount: "$9300" },
  { phone: "+91 43* *** *234", amount: "$9500" },
  { phone: "+91 42* *** *345", amount: "$9700" },
  { phone: "+91 41* *** *456", amount: "$9900" },
  { phone: "+91 40* *** *567", amount: "$10000" },
  { phone: "+91 39* *** *678", amount: "$10500" },
  { phone: "+91 38* *** *789", amount: "$11000" },
  { phone: "+91 37* *** *890", amount: "$11500" },
  { phone: "+91 36* *** *901", amount: "$12000" },
  { phone: "+91 35* *** *012", amount: "$12500" },
  { phone: "+91 34* *** *123", amount: "$13000" },
  { phone: "+91 33* *** *234", amount: "$13500" },
  { phone: "+91 32* *** *345", amount: "$14000" },
  { phone: "+91 31* *** *456", amount: "$14500" },
  { phone: "+91 30* *** *567", amount: "$15000" },
  { phone: "+91 29* *** *678", amount: "$15500" },
  { phone: "+91 28* *** *789", amount: "$16000" },
  { phone: "+91 27* *** *890", amount: "$16500" },
  { phone: "+91 26* *** *901", amount: "$17000" },
  { phone: "+91 25* *** *012", amount: "$17500" },
  { phone: "+91 24* *** *123", amount: "$18000" },
  { phone: "+91 23* *** *234", amount: "$18500" },
  { phone: "+91 22* *** *345", amount: "$19000" },
  { phone: "+91 21* *** *456", amount: "$19500" },
  { phone: "+91 20* *** *567", amount: "$20000" },

  // --- 20 numbers from other countries (20%) ---
  { phone: "+1 23* *** *900", amount: "$1500" },
  { phone: "+44 71* *** *123", amount: "$1200" },
  { phone: "+61 41* *** *111", amount: "$2500" },
  { phone: "+81 80* *** *999", amount: "$3000" },
  { phone: "+49 15* *** *101", amount: "$4000" },
  { phone: "+33 6* *** *111", amount: "$2000" },
  { phone: "+86 13* *** *999", amount: "$3500" },
  { phone: "+7 90* *** *123", amount: "$1200" },
  { phone: "+55 21* *** *111", amount: "$2000" },
  { phone: "+1 98* *** *210", amount: "$2300" },
  { phone: "+44 72* *** *456", amount: "$3400" },
  { phone: "+61 42* *** *222", amount: "$3500" },
  { phone: "+81 81* *** *888", amount: "$1200" },
  { phone: "+49 16* *** *202", amount: "$1500" },
  { phone: "+33 7* *** *222", amount: "$2500" },
  { phone: "+86 14* *** *888", amount: "$4000" },
  { phone: "+7 91* *** *234", amount: "$900" },
  { phone: "+55 22* *** *222", amount: "$1500" },
  { phone: "+1 55* *** *567", amount: "$5000" },
  { phone: "+44 73* *** *789", amount: "$2900" },
];

const formatTime = () => {
  const d = new Date();
  return d.toLocaleTimeString();
};

export default function SmoothTicker() {
  const scrollRef = useRef(null);
  const [tickerItems, setTickerItems] = useState([]);

  useEffect(() => {
    const items = [];
    for (let i = 0; i < 20; i++) {
      phoneData.forEach(({ phone, amount }) => {
        items.push({
          time: formatTime(),
          phone,
          amount,
          key: `${i}-${phone}-${amount}-${Date.now()}`
        });
      });
    }
    setTickerItems(items);
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    let rafId;
    const speed = 0.5;

    const step = () => {
      if (el.scrollLeft >= el.scrollWidth / 2) {
        el.scrollLeft = 0;
      } else {
        el.scrollLeft += speed;
      }
      rafId = requestAnimationFrame(step);
    };

    rafId = requestAnimationFrame(step);

    return () => cancelAnimationFrame(rafId);
  }, [tickerItems]);

  return (
    <Container
      fluid
      className="d-flex align-items-center text-white"
      style={{
        backgroundColor: "violet",
        overflow: "hidden",
        whiteSpace: "nowrap",
        height: "40px",
        fontWeight: "600",
        fontSize: "1rem",
        position: "relative",
      }}
      ref={scrollRef}
    >
      <div style={{ display: "inline-block", paddingRight: "50px" }}>
        {tickerItems.map(({ time, phone, amount, key }) => (
          <span key={key} style={{ paddingRight: "50px" }}>
            {time} &nbsp;📞 {phone} sold 💰 {amount}
          </span>
        ))}
      </div>
      <div style={{ display: "inline-block", paddingRight: "50px" }}>
        {tickerItems.map(({ time, phone, amount, key }) => (
          <span key={`dup-${key}`} style={{ paddingRight: "50px" }}>
            {time} &nbsp;📞 {phone} sold 💰 {amount}
          </span>
        ))}
      </div>
    </Container>
  );
}
