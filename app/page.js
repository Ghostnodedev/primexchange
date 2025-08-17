import Navbar from './component/header';
import styles from './page.module.css';
import StepSection from './component/section2';

export default function Home() {
  return (
    <>
    <div className={styles.heroContainer}>
      <Navbar />
      <div className={styles.heroContent}>
      </div>
      
    </div>
    <StepSection />
    </>
  );
}
