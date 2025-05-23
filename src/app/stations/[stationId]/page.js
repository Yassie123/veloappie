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
  const [stationCelebration, setStationCelebration] = useState(0);
  const [hearts, setHearts] = useState([]);
  const [confetti, setConfetti] = useState([]);

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

      // Load celebration count from localStorage
      const savedCelebration = localStorage.getItem(
        `station_celebration_${params.stationId}`
      );
      if (savedCelebration) {
        setStationCelebration(parseInt(savedCelebration, 10));
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

  // Function to give love to the station (for sad stations)
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
      rotation: Math.random() * 360, // Random rotation
    };

    setHearts((prevHearts) => [...prevHearts, newHeart]);

    // Remove heart after animation completes
    setTimeout(() => {
      setHearts((prevHearts) =>
        prevHearts.filter((heart) => heart.id !== newHeart.id)
      );
    }, 2000);
  };

  // Function to send confetti to the station (for happy stations)
  const sendConfetti = () => {
    const newCelebrationCount = stationCelebration + 1;
    setStationCelebration(newCelebrationCount);

    // Save to localStorage
    localStorage.setItem(
      `station_celebration_${params.stationId}`,
      newCelebrationCount.toString()
    );

    // Create a new confetti for animation (same pattern as hearts)
    const newConfetti = {
      id: Date.now(),
      x: Math.random() * 80 + 10, // Random x position (10% to 90%)
      speed: Math.random() * 2 + 3, // Random speed
      rotation: Math.random() * 360, // Random rotation
    };

    setConfetti((prevConfetti) => [...prevConfetti, newConfetti]);

    // Remove confetti after animation completes
    setTimeout(() => {
      setConfetti((prevConfetti) =>
        prevConfetti.filter(
          (confettiPiece) => confettiPiece.id !== newConfetti.id
        )
      );
    }, 2000);
  };

  return (
    <div className={styles.stationContainer}>
      <div className={styles.stationInfo}>
        <div className={styles.titleContainer}>
          <Link className={styles.terug} href="/dagboekpaginas">
            <p className={styles.backButton}>⬅ Terug</p>
          </Link>
          <h1 className={styles.title}>{station.name}</h1>
        </div>
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

        {!isHappy && (
          <div className={styles.loveSection}>
            <img src="/postit2.png" alt="postit" className={styles.postit} />
            <div className={styles.loveContent}>
              <div className={styles.loveCounter}>
                <span className={styles.loveCount}>{stationLove}</span> keer
                liefde getoond
              </div>
              <button className={styles.loveButton} onClick={giveLove}>
                ❤️ Toon liefde
              </button>
            </div>
          </div>
        )}

        {isHappy && (
          <div className={styles.loveSection}>
            <img src="/postit3.png" alt="postit" className={styles.postit} />
            <div className={styles.loveContent}>
              <div className={styles.loveCounter}>
                <span className={styles.loveCount}>{stationCelebration}</span>{' '}
                keer gevierd
              </div>
              <button className={styles.loveButton} onClick={sendConfetti}>
                🎉 Vier mee
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Hearts container for sad stations */}
      <div className={styles.heartsContainer}>
        {hearts.map((heart) => (
          <div
            key={heart.id}
            className={styles.flyingHeart}
            style={{
              left: `${heart.x}%`,
              transform: `rotate(${heart.rotation}deg)`,
              animationDuration: `${heart.speed}s`,
            }}
          >
            ❤️
          </div>
        ))}
      </div>

      {/* Confetti container for happy stations */}
      <div className={styles.confettiContainer}>
        {confetti.map((confettiPiece) => (
          <div
            key={confettiPiece.id}
            className={styles.flyingConfetti}
            style={{
              left: `${confettiPiece.x}%`,
              transform: `rotate(${confettiPiece.rotation}deg)`,
              animationDuration: `${confettiPiece.speed}s`,
            }}
          >
            🎉
          </div>
        ))}
      </div>
    </div>
  );
}
