'use client';
import { RuxClassificationMarking } from '@astrouxds/react';

import styles from '@assets/css/classification-banner.module.css';

export default function AppClassificationBanner() {
  return (
    <div className={styles.container}>
      <RuxClassificationMarking classification="unclassified" />
    </div>
  );
}
