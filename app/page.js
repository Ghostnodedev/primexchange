/* eslint-disable @next/next/no-img-element */
import Navbar from "./component/header";
import styles from "./page.module.css";
import StepSection from "./component/section2";
import Homefetch from "./component/fetchapi";
import Footer from "./component/footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <div className={styles.heroContainer}>
        <div className={styles.heroContent}></div>
      </div>
      <StepSection />
      <Homefetch />

      {/* WhatsApp Floating Button */}
      <a
        href="https://wa.me/1234567890"
        target="_blank"
        rel="noopener noreferrer"
        style={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
          zIndex: 1000,
          backgroundColor: "#25D366",
          width: "55px",
          height: "55px",
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
        }}
      >
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
          alt="WhatsApp"
          style={{ width: "32px", height: "32px" }}
        />
      </a>

      {/* Footer section */}
      <Footer />
    </>
  );
}
