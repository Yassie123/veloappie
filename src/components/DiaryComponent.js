'use client';

import styles from './DiaryComponent.module.css';
import Link from 'next/link';

export default function DiaryComponent({ station }) {
  return (
    <div className={styles.stationEntry}>
      <div className={styles.stationHeader}>
        <Link
          className={styles.lijn}
          href={`/stations/${station.id}?showDiary=true`}
        >
          <h2 className={styles.stationName}>{station.name}</h2>
        </Link>

        <span className={styles.stationDistance}>
          {station.distance.toFixed(2)} km van jou
        </span>
      </div>
    </div>
  );
}
