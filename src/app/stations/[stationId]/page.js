'use client';

import styles from './page.module.css';
import useNetwork from '@/data/network';
import { useParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import { getDiaryText } from '@/data/diaryTexts';
import Link from 'next/link';

export default function Station() {
  const { network, isLoading, isError } = useNetwork();
  const params = useParams();
  const [showDiaryText, setShowDiaryText] = useState(false);
  const [stationLove, setStationLove] = useState(0);
  const [hearts, setHearts] = useState([]);

  useEffect(() => {
    // Only run on client side
    if (typeof window !== 'undefined' && params.stationId) {
      // Load love count from localStorage
      const savedLove = localStorage.getItem(
        `station_love_${params.stationId}`
      );
      if (savedLove) {
        setStationLove(parseInt(savedLove, 10));
      }
    }
  }, [params.stationId]);

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

  // Function to give love to the station
  const giveLove = () => {
    const newLoveCount = stationLove + 1;
    setStationLove(newLoveCount);

    // Save to localStorage
    localStorage.setItem(
      `station_love_${params.stationId}`,
      newLoveCount.toString()
    );

    // Create a new heart for animation
    const newHeart = {
      id: Date.now(),
      x: Math.random() * 80 + 10, // Random x position (10% to 90%)
      speed: Math.random() * 2 + 3, // Random speed
    };

    setHearts((prevHearts) => [...prevHearts, newHeart]);

    // Remove heart after animation completes
    setTimeout(() => {
      setHearts((prevHearts) =>
        prevHearts.filter((heart) => heart.id !== newHeart.id)
      );
    }, 2000);
  };

  // Calculate the love meter percentage
  const loveMeterPercentage = Math.min(100, (stationLove / 10) * 100);

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
          <img src="/postit.png" alt="postit" className={styles.postit}></img>
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

        {!isHappy && (
          <div className={styles.loveSection}>
            <h2 className={styles.loveTitle}>
              Geef dit verdrietig station wat liefde
            </h2>
            <div className={styles.heartsContainer}>
              {hearts.map((heart) => (
                <div
                  key={heart.id}
                  className={styles.flyingHeart}
                  style={{
                    left: `${heart.x}%`,
                    animationDuration: `${2000 / heart.speed}ms`,
                  }}
                >
                  ❤️
                </div>
              ))}
            </div>
            {/* Love counter */}
            <div className={styles.loveCounter}>
              <span className={styles.loveCount}>{stationLove}</span> keer
              liefde getoond
            </div>

            {/* Love button */}
            <button className={styles.loveButton} onClick={giveLove}>
              ❤️ Toon liefde
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
