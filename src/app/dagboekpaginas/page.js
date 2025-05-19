'use client';

import styles from './page.module.css';
import { useEffect, useState } from 'react';
import useNetwork from '@/data/network';
import { getDistance } from '@/helpers/get-distance';
import DiaryComponent from '@/components/DiaryComponent';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

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
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <div className={styles.arrowRight}>→</div>,
    prevArrow: <div className={styles.arrowLeft}>←</div>,
  };
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Dagboekpaginas</h1>
      <div className={styles.slider}>
        {nearestStations.map((station) => (
          <div key={station.id} className={styles.sliderItem}>
            <DiaryComponent station={station} />
          </div>
        ))}
      </div>
    </div>
  );
  //<Slider {...sliderSettings}>
  //      {nearestStations.map((station) => (
  //         <div key={station.id} className={styles.sliderItem}>
  //          <DiaryComponent station={station} />
  //      </div>
  //    ))}
  //   </Slider>
}
//
