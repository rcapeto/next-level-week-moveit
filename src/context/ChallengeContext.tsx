import { createContext, useState, ReactNode, useEffect } from 'react';
import Cookie from 'js-cookie';

import challenges from '../../challenges.json';
import LevelUpModal from '../components/LevelUpModal';

interface ChallengesProviderProps {
   children: ReactNode;
   level: number;
   currentExperience: number;
   challengesCompleted: number;
}

interface Challenge {
   type: 'body' | 'eye';
   description: string;
   amount: number;
}

interface ChallengesContextData {
   level: number,
   levelUp: () => void,
   currentExperience: number, 
   challengesCompleted: number,
   startNewChallenge: () => void,
   activeChallenge: Challenge;
   resetChallenge: () => void;
   experienceToNextLevel: number;
   completeChallenge: () => void;
   closeLevelUpModal: () => void;
}


export const ChallengeContext = createContext({} as ChallengesContextData);

export function ChallengesProvider({ 
   children, 
   ...props
}: ChallengesProviderProps) {
   const [level, setLevel] = useState(props.level ?? 1);
   const [currentExperience, setCurrentExperience] = useState(props.currentExperience ?? 0);
   const [challengesCompleted, setChallengesCompleteds] = useState(props.challengesCompleted ?? 0);
   const [activeChallenge, setActiveChallenge] = useState(null);
   const [showModalLevelUp, setShowModalLevelUp] = useState(false);
   
   const experienceToNextLevel = Math.pow((level + 1) * 4, 2);

   useEffect(() => {
      Notification.requestPermission();
   }, []);

   useEffect(() => {
      Cookie.set('level', String(level));     
      Cookie.set('currentExperience', String(currentExperience));     
      Cookie.set('challengesCompleted', String(challengesCompleted));     
   }, [level, currentExperience, challengesCompleted]);
 

   function levelUp() {
     setLevel(level + 1);
     setShowModalLevelUp(true);
   }

   function closeLevelUpModal() {
      setShowModalLevelUp(false);
   }

   function startNewChallenge() {
      const randomChallengeIndex = Math.floor(Math.random() * challenges.length);
      const challenge = challenges[randomChallengeIndex];
      setActiveChallenge(challenge);

      if(Notification.permission === 'granted') {
         new Notification('Novo Desafio', {
            body: `Valendo ${challenge.amount}xp!`,
         });
         new Audio('./notification.mp3').play();
      }
   }

   function resetChallenge() {
      setActiveChallenge(null);
   }

   function completeChallenge() {
      if(!activeChallenge) return;
   
      const { amount } = activeChallenge as Challenge;

      let finalExperience = currentExperience + amount;

      if(finalExperience >= experienceToNextLevel) {
         finalExperience = finalExperience - experienceToNextLevel;
         levelUp();
      }

      setCurrentExperience(finalExperience);
      setActiveChallenge(null);
      setChallengesCompleteds(challengesCompleted + 1);
   }  

   return(
      <ChallengeContext.Provider value={{
         level,
         levelUp,
         currentExperience, 
         challengesCompleted,
         startNewChallenge,
         activeChallenge,
         resetChallenge,
         experienceToNextLevel,
         completeChallenge,
         closeLevelUpModal
      }}>
         { children }
        
         { showModalLevelUp && <LevelUpModal /> }
      
      </ChallengeContext.Provider>
   );
}
