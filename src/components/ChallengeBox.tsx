import { useContext } from 'react';
import { ChallengeContext } from '../context/ChallengeContext';
import { CountDownContext } from '../context/CountDownContext';
import styles from '../styles/components/ChallengeBox.module.css';

export default function ChallengeBox() {
   const { activeChallenge, resetChallenge, completeChallenge } = useContext(ChallengeContext);
   const { resetCountDown } = useContext(CountDownContext);

   function handleChallengedSucceeded() {
      completeChallenge();
      resetCountDown();
   }

   function handleChallengedFailed() {
      resetChallenge();
      resetCountDown();
   }

   return(
      <div className={styles.challengeBoxContainer}>
        { activeChallenge ? (
           <div className={styles.challengeActive}>
              <header>Ganhe {activeChallenge.amount} xp</header>

              <main>
                 <img src={`./icons/${activeChallenge.type}.svg`} alt={`${activeChallenge.type}`}/>
                 <strong>Novo desafio</strong>
                 <p>{activeChallenge.description}</p>
              </main>

              <footer>
                  <button 
                     type="button"
                     className={styles.challengeFailedButton}
                     onClick={handleChallengedFailed}
                  >
                    Falhei
                  </button>

                  <button
                     type="button"
                     className={styles.challengeSucceededButton}
                     onClick={handleChallengedSucceeded}
                  >
                    Completei
                  </button>
              </footer>
           </div>
        ) : (
            <div className={styles.challengeNotActive}>
               <strong>Finalize um ciclo para receber desafios</strong>

               <p>
                  <img src="./icons/level-up.svg" alt="Level-up"/>
                  Avance de level completando desafios
               </p>
            </div>
        )}
      </div>
   );
}