'use client';

import { useState, useEffect } from 'react';
import styles from './DiaryComponent.module.css';
import { getDiaryText } from '@/data/diaryTexts';

export default function DiaryComponent({ station }) {
  const [showDiaryText, setShowDiaryText] = useState(false);
  const [mapillaryImage, setMapillaryImage] = useState(null);
  const [loading, setLoading] = useState(false);

  // Calculate if the station is happy or sad based on available bikes
  // If more than half of the slots have bikes, the station is happy
  const totalSlots = station.empty_slots + station.free_bikes;
  const isHappy = station.free_bikes > totalSlots / 2;

  // Fetch Mapillary image based on station coordinates
  useEffect(() => {
    const fetchMapillaryImage = async () => {
      if (!station.latitude || !station.longitude) return;

      // Mapillary API token
      const MAPILLARY_TOKEN =
        'MLY|10057005467654917|6d54fa566d1dfe3a424c7621c12454a8';

      setLoading(true);
      try {
        // Fetch images near the station location
        // Using a small bounding box around the station coordinates
        const response = await fetch(
          `https://graph.mapillary.com/images?access_token=${MAPILLARY_TOKEN}&fields=id,thumb_1024_url&bbox=${station.longitude - 0.001},${station.latitude - 0.001},${station.longitude + 0.001},${station.latitude + 0.001}&limit=1`
        );

        const data = await response.json();

        if (data.data && data.data.length > 0) {
          setMapillaryImage(data.data[0].thumb_1024_url);
        }
      } catch (error) {
        console.error('Error fetching Mapillary image:', error);
      }
      setLoading(false);
    };

    fetchMapillaryImage();
  }, [station.latitude, station.longitude]);

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

      {/* Mapillary Image Section */}
      <div className={styles.mapillarySection}>
        {loading ? (
          <div className={styles.imageLoading}>Laden van stationsbeeld...</div>
        ) : mapillaryImage ? (
          <img
            src={mapillaryImage}
            alt={`Straatbeeld nabij ${station.name}`}
            className={styles.mapillaryImage}
          />
        ) : (
          <div className={styles.noImage}>
            Geen straatbeelden beschikbaar voor deze locatie
          </div>
        )}
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
