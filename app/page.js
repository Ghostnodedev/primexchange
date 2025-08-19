import Navbar from './component/header';
import styles from './page.module.css';
import StepSection from './component/section2';
import Homefetch from './component/fetchapi';

export default function Home() {
  return (
    <>
    <div className={styles.heroContainer}>
      <Navbar />
      <div className={styles.heroContent}>
      </div>
    </div>
    <StepSection />
    <Homefetch />
    {/* footer section */}
    
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <p>&copy; {new Date().getFullYear()} Your Company. All rights reserved.</p>
      </div>
    </footer>
    </>
  );
}
