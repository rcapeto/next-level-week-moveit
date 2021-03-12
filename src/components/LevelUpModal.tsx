import { ChallengeContext } from '../context/ChallengeContext';
import { useContext } from 'react';
import styles from '../styles/components/LevelUpModal.module.css';

export default function LevelUpModal() {
   const { level, closeLevelUpModal } = useContext(ChallengeContext);

   return(
      <div className={styles.overlay}>
         <div className={styles.levelUpModalContainer}>
            <header>{level}</header>
            <strong>Parabéns!</strong>
            <p>Você alcançou um novo level.</p>

            <button type="button" onClick={closeLevelUpModal}>
               <img src="./icons/close.svg" alt="Fechar Modal"/>
            </button>
         </div>
      </div>
   );
}