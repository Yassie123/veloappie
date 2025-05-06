'use client';

import styles from './page.module.css';
import useNetwork from '@/data/network';
import { useParams } from 'next/navigation';
import StationImage from '@/components/StationImage';
import { useState } from 'react';
import { getDiaryText } from '@/data/diaryTexts';

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

  const handleReadDiary = () => {
    setShowDiaryText(!showDiaryText);
  };

  return (
    <div className={styles.stationContainer}>
      <h1 className={styles.title}>{station.name}</h1>

      <div className={styles.stationInfo}>
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

        <button onClick={handleReadDiary} className={styles.readButton}>
          {showDiaryText
            ? 'Verberg dagboektekst'
            : 'Lees hoe dit station zich voelt'}
        </button>

        {showDiaryText && (
          <div className={styles.diaryText}>
            <p>{getDiaryText(station.name, isHappy)}</p>
          </div>
        )}
      </div>

      <div className={styles.imageContainer}>
        <StationImage station={station} />
      </div>
    </div>
  );
}
