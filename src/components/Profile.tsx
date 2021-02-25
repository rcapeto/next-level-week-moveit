import styles from '../styles/components/Profile.module.css';

export default function Profile() {
   return(
      <div className={styles.profileContainer}>
         <img src="https://github.com/rcapeto.png" alt="Raphael Capeto"/>
         <div>
            <strong>Raphael Capeto</strong>
            <p>
               <img src="icons/level.svg" alt="Level"/>
               Level 1
            </p>
         </div>
      </div>
   );
}