import CompletedChallenges from '../components/CompletedChallenge';
import CountDown from '../components/CountDown';
import ExperienceBar from '../components/ExperienceBar';
import Profile from '../components/Profile';
import Head from 'next/head';
import styles from '../styles/pages/Home.module.css';

export default function Home() {
  return (
    <div className={styles.container}>

      <Head>
        <title>Início | move.it</title>
      </Head>
      <ExperienceBar />

      <section>
        <div className={styles.leftContainer}>
          <Profile />
          <CompletedChallenges />
          <CountDown />
        </div>
        <div></div>

      </section>
    </div>
  )
}
