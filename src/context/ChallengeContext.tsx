import { createContext, useState, ReactNode, useEffect } from 'react';
import challenges from '../../challenges.json';

interface ChallengesProviderProps {
   children: ReactNode
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
}


export const ChallengeContext = createContext({} as ChallengesContextData);

export function ChallengesProvider({ children }: ChallengesProviderProps) {
   const [level, setLevel] = useState(1);
   const [currentExperience, setCurrentExperience] = useState(0);
   const [challengesCompleted, setChallengesCompleteds] = useState(0);
   const [activeChallenge, setActiveChallenge] = useState(null);
   
   const experienceToNextLevel = Math.pow((level + 1) * 4, 2);

   useEffect(() => {
      Notification.requestPermission();
   }, []);

   function levelUp() {
     setLevel(level + 1);
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
         completeChallenge
      }}>
         { children }
      </ChallengeContext.Provider>
   );
}
