'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './navbarComponent.module.css';

export default function Navbar() {
  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        <div className={styles.logoContainer}>
          <Link href="/" className={styles.logoLink}>
            <div className={styles.logo}>
              <Image
                src="/logo.png"
                alt="Fiets Dagboek Logo"
                width={50}
                height={50}
                className={styles.logoImage}
                priority
              />
            </div>
          </Link>
        </div>
      </div>
    </nav>
  );
}
