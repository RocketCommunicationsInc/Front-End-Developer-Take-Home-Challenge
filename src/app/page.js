'use client';
import { RuxButton } from '@astrouxds/react'

import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <p>Hello World</p>
        <RuxButton>Rux Button</RuxButton>
      </main>
      <footer className={styles.footer}></footer>
    </div>
  );
}
