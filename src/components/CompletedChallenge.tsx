import styles from '../styles/components/CompletedChallenge.module.css';

export default function CompletedChallenges() {
   return(
      <div className={styles.completedChallengesContainer}>
         <span>Desafios Completos</span>
         <span>5</span>
      </div>
   );
}