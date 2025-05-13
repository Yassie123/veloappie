'use client';

import { useState } from 'react';
import styles from './DiaryComponent.module.css';
import { getDiaryText } from '@/data/diaryTexts';

export default function DiaryComponent({ station }) {
  const [showDiaryText, setShowDiaryText] = useState(false);

  // Calculate if the station is happy or sad based on available bikes
  // If more than half of the slots have bikes, the station is happy
  const totalSlots = station.empty_slots + station.free_bikes;
  const isHappy = station.free_bikes > totalSlots / 2;

  const handleReadDiary = () => {
    setShowDiaryText(!showDiaryText);
  };

  return (
    <div className={styles.stationEntry}>
      <div className={styles.stationHeader}>
        <h2 className={styles.stationName}>{station.name}</h2>
        <span className={styles.stationDistance}>
          {station.distance.toFixed(2)} km van jou
        </span>
      </div>
      <div className={styles.stationStats}>
        <div className={styles.statItem}>
          <span className={styles.statLabel}>Beschikbare fietsen:</span>{' '}
          {station.free_bikes}
        </div>
        <div className={styles.statItem}>
          <span className={styles.statLabel}>Lege plekken:</span>{' '}
          {station.empty_slots}
        </div>
      </div>
      <div className={styles.emotionImage}>
        <img
          src={isHappy ? '/happyfiets.png' : '/sadfiets.png'}
          alt={isHappy ? 'Happy emotion' : 'Sad emotion'}
          className={styles.moodImage}
        />
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
  );
}
