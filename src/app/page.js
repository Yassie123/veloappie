'use client';

import styles from './page.module.css';
import Link from 'next/link';

export default function Home() {
  return (
    <div className={styles.container}>
      <div className={styles.diaryCover}>
        {/* The cover design is applied via CSS */}
        <Link href="/dagboekpaginas">
          <button className={styles.diaryButton}>Lees het dagboek</button>
        </Link>
      </div>
    </div>
  );
}
