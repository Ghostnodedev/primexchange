import Navbar from './component/header';
import styles from './page.module.css';
import StepSection from './component/section2';
import Homefetch from './component/fetchapi';
import Footer from './component/footer';

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

    <Footer />
    </>
  );
}