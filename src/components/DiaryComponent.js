'use client';

import styles from './DiaryComponent.module.css';
import Link from 'next/link';

export default function DiaryComponent({ station }) {
  // Calculate if the station is happy or sad based on available bikes
  // If more than half of the slots have bikes, the station is happy
  const totalSlots = station.empty_slots + station.free_bikes;

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
