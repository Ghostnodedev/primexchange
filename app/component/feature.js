"use client";
import { FaHeadset, FaCoins, FaChartLine, FaShieldAlt } from "react-icons/fa";

export default function FeaturesSection() {
  const features = [
    {
      Icon: FaHeadset,
      title: "Talk to Real Experts",
      desc: "Connect with our support team anytime — instant help with real experts.",
    },
    {
      Icon: FaCoins,
      title: "Zero Fee Trading",
      desc: "Trade freely with secure, seamless payments and no hidden charges.",
    },
    {
      Icon: FaChartLine,
      title: "Live Market Insights",
      desc: "Stay ahead with instant market insights, trading trends, and crypto updates.",
    },
    {
      Icon: FaShieldAlt,
      title: "Trusted Security",
      desc: "Your assets are protected by multi-layered security protocols & proactive monitoring.",
    },
  ];

  return (
    <section style={styles.section}>
      <div className="features-container">
        {features.map((f, i) => {
          const Icon = f.Icon;
          return (
            <div key={i} className="card">
              <div style={styles.iconWrapper}>
                <Icon size={32} color="#ff82d3" />
              </div>
              <h3 style={styles.title}>{f.title}</h3>
              <p style={styles.desc}>{f.desc}</p>
            </div>
          );
        })}
      </div>

      <style jsx>{`
        .features-container {
          display: grid;
          gap: 30px;
          width: 100%;
          max-width: 1200px;
          grid-template-columns: repeat(1, 1fr); /* mobile default */
        }

        .card {
          background: linear-gradient(135deg, #0f0720 0%, #2b1457 50%);
          border-radius: 18px;
          padding: 28px;
          text-align: left;
          color: #fff;
          transition: transform 220ms ease, box-shadow 220ms ease;
          box-shadow: 5px 5px 15px 10px rgba(8, 0, 20, 0.25);
          overflow: hidden; /* keep rounded corners clean */
        }

        .card:hover {
          transform: translateY(-6px);
          box-shadow: 10px 22px 50px rgba(46, 6, 106, 0.35);
        }

        @media (min-width: 768px) {
          .features-container {
            grid-template-columns: repeat(2, 1fr);
          }
        }
      `}</style>
    </section>
  );
}

/* Inline JS styles for elements */
const styles = {
  section: {
    width: "100%",
    minHeight: "100vh",
    padding: "60px 40px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  iconWrapper: {
    width: "72px", 
    height: "72px",
    borderRadius: "50%",
    background: "rgba(229, 221, 235, 0.06)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: "18px",
  },
  title: {
    fontSize: "1.35rem",
    fontWeight: 700,
    marginBottom: "12px",
    color: "#ffd2f5",
  },
  desc: {
    fontSize: "0.98rem",
    color: "rgba(255,255,255,0.9)",
    lineHeight: 1.6,
  },
};
