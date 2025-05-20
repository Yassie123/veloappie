'use client';

import styles from './page.module.css';
import useNetwork from '@/data/network';
import { useParams } from 'next/navigation';
import { useState } from 'react';
import { getDiaryText } from '@/data/diaryTexts';
import Link from 'next/link';
export default function Station() {
  const { network, isLoading, isError } = useNetwork();
  const params = useParams();
  const [showDiaryText, setShowDiaryText] = useState(false);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error</div>;

  const station = network.stations.find(
    (station) => station.id === params.stationId
  );

  if (!station) {
    return <div>Station niet gevonden</div>;
  }

  // Calculate if the station is happy or sad based on available bikes
  const totalSlots = station.empty_slots + station.free_bikes;
  const isHappy = station.free_bikes > totalSlots / 2;

  return (
    <div className={styles.stationContainer}>
      <Link href="/dagboekpaginas">
        <p className={styles.backButton}>terug</p>
      </Link>
      <div className={styles.stationInfo}>
        <h1 className={styles.title}>{station.name}</h1>
        <div className={styles.stationDetails}>
          <p className={styles.stationStat}>
            <span className={styles.statLabel}>Beschikbare fietsen:</span>{' '}
            {station.free_bikes}
          </p>
          <p className={styles.stationStat}>
            <span className={styles.statLabel}>Lege plekken:</span>{' '}
            {station.empty_slots}
          </p>
        </div>
        <div className={styles.emotionImage}>
          <img
            src={isHappy ? '/happyfiets.png' : '/sadfiets.png'}
            alt={isHappy ? 'Happy emotion' : 'Sad emotion'}
            className={styles.moodImage}
          />
        </div>
        <div className={styles.diaryText}>
          <p>{getDiaryText(station.name, isHappy)}</p>
        </div>
      </div>
    </div>
  );
}
