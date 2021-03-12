import { GetServerSideProps } from 'next';
import CompletedChallenges from '../components/CompletedChallenge';
import CountDown from '../components/CountDown';
import ExperienceBar from '../components/ExperienceBar';
import Profile from '../components/Profile';
import Head from 'next/head';
import styles from '../styles/pages/Home.module.css';
import ChallengeBox from '../components/ChallengeBox';

import { ChallengesProvider } from '../context/ChallengeContext';
import { CountDownProvider } from '../context/CountDownContext';

interface HomeProps {
  level: number;
  currentExperience: number;
  challengesCompleted: number;
}

export default function Home(props: HomeProps) {

  return (
    <ChallengesProvider 
      level={props.level} 
      currentExperience={props.currentExperience} 
      challengesCompleted={props.challengesCompleted}
    >
      <div className={styles.container}>
        <Head>
          <title>Início | move.it</title>
        </Head>
        <ExperienceBar />

        <CountDownProvider>
          <section>
            <div>
              <Profile />
              <CompletedChallenges />
              <CountDown />
            </div>
            <div>
              <ChallengeBox />
            </div>

          </section>
        </CountDownProvider>
      </div>
    </ChallengesProvider>
    
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { level, currentExperience, challengesCompleted } = context.req.cookies;
  
  return {
    props: {
      level: Number(level),
      currentExperience: Number(currentExperience),
      challengesCompleted: Number(challengesCompleted)
    }
  }
} //Tudo nessa função ele retorna no NODE.JS, no "servidor" por isso se eu der console.log dentro dela,
// vai aparecer no console do terminal
