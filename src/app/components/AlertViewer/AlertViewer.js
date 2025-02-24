import React from 'react';

import styles from './AlertViewer.module.css';

export function AlertViewer({prop = 'default value'}) {
  return <div className={styles.AlertViewer}>AlertViewer {prop}</div>;
}
