import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>NFT App</title>
        <meta name="description" content="Health data NFT" />
        <link rel="icon" href="/heart.png" />
      </Head>
    </div>
  );
}
