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
          <h1 className={styles.heroHeading}>
            <span className={styles.highlight}>Your Gateway to Safe & Fast USDT Trading</span>
            <br />
            <span className={styles.subheading}>
              Exchange Smart
            </span>
            <br />
            <strong className={styles.strongText}>
              Grow Securely.
            </strong>
          </h1>
          {/* <p className={styles.heroSubText}>Trust the chain. Grow your gain.</p> */}
          {/* button removed from here */}

          <div className={styles.btnWrapper}>
            <button className={styles.exchangeBtn}>Exchange !</button>
          </div>
        </div>

        {/* Right Content (Images) */}
        <div className={styles.heroRight}>
          <img
            src="/cryptot.jpg"
            alt="Team work"
            className={styles.heroImageTop}
          />
        </div>

        {/* Button wrapper (repositioned by CSS) */}
        {/* <div className={styles.btnWrapper}>
          <button className={styles.exchangeBtn}>Exchange !</button>
        </div> */}
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
