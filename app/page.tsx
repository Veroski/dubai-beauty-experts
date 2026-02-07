import DubaiParallax from "../components/DubaiParallax";
import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.hero} aria-label="Hero">
      <div className={styles.content}>
        <DubaiParallax className={styles.dubai} />
      </div>
    </main>
  );
}

