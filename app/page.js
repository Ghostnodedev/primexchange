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
        {/* Left Content */}
        <div className={styles.heroLeft}>
          <h1>
            <span className={styles.highlight}>Welcome to Crypto World</span>
            <br />
            Explore, trade, and stay ahead in the <br />
            <strong>digital finance revolution</strong>
          </h1>
          <p>Trust the chain. Grow your gain.</p>
          <button className={styles.exchangeBtn}>Exchange !</button>
        </div>

        {/* Right Content (Images) */}
        <div className={styles.heroRight}>
          <img src="/banner2.jpg" alt="Team work" className={styles.heroImageTop} />
          <img
            src="/banner.jpg"
            alt="Trading on phone"
            className={styles.heroImageBottom}
          />
        </div>
      </div>

      <StepSection />
      <Homefetch />

      {/* WhatsApp Floating Button */}
      <a
        href="https://wa.me/1234567890"
        target="_blank"
        rel="noopener noreferrer"
        className={styles.whatsappBtn}
      >
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
          alt="WhatsApp"
        />
      </a>

      <Footer />
    </>
  );
}
