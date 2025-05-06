'use client';

import styles from './page.module.css';
import { useEffect, useState } from 'react';
import useNetwork from '@/data/network';
import { getDistance } from '@/helpers/get-distance';
import DiaryComponent from '@/components/DiaryComponent';

export default function Dagboekpaginas() {
  const [location, setLocation] = useState({});
  const { network, isLoading, isError } = useNetwork();

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (error) => {
          console.error(error);
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  }, []);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error</div>;

  const stations = network.stations.map((station) => ({
    ...station,
    distance:
      getDistance(
        location.latitude,
        location.longitude,
        station.latitude,
        station.longitude
      ).distance / 1000,
  }));

  // Sort by distance and get the nearest 5 stations
  const nearestStations = stations
    .sort((a, b) => a.distance - b.distance)
    .slice(0, 5);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Dagboekpaginas</h1>
      <div className={styles.stationsList}>
        {nearestStations.map((station) => (
          <DiaryComponent key={station.id} station={station} />
        ))}
      </div>
    </div>
  );
}
