import { createContext, ReactNode, useState, useContext, useEffect } from 'react';
import { ChallengeContext } from './ChallengeContext';

interface CountDownContextData {
   minutes: number;
   seconds: number;
   isActive: boolean;
   hasFinished: boolean;
   startCountDown: () => void;
   resetCountDown: () => void;
}

interface CountDownContextProps {
   children: ReactNode
}

let countDownTimeout: NodeJS.Timeout;

export const CountDownContext = createContext({} as CountDownContextData);

export function CountDownProvider({ children }: CountDownContextProps) {
   const { startNewChallenge } = useContext(ChallengeContext);

   const [time, setTime] = useState(0.1 * 60);
   const [isActive, setIsActive] = useState(false);
   const [hasFinished, setHasFinished] = useState(false);
   
   const minutes = Math.floor(time / 60);
   const seconds = time % 60;

   function startCountDown() {
      setIsActive(true);
   }

   function resetCountDown() {
      setIsActive(false);
      setHasFinished(false);
      clearTimeout(countDownTimeout);
      setTime(0.1 * 60);
   }

   useEffect(() => {
      if(isActive && time > 0) {
         countDownTimeout = setTimeout(() => {
            setTime(time - 1);
         }, 1000);
      } else if(isActive && time === 0) {
         setHasFinished(true);
         setIsActive(false);
         startNewChallenge();
      }
   }, [isActive, time]);

   return(
      <CountDownContext.Provider value={{
         isActive,
         hasFinished,
         minutes,
         resetCountDown,
         startCountDown,
         seconds
      }}>
         { children }
      </CountDownContext.Provider>
   );
}