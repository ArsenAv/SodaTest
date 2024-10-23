import React from 'react';
import styles from "./styles.module.scss";
import Link from 'next/link'; // Импортируем Link

export const Header: React.FC<{ userName: string }> = ({userName}) => {
 return (
    <div className={styles.mainNav}>
     <div className={styles.nav}>
         <Link href="/" passHref>
             <span>Главная</span>
         </Link>
         <Link href="/calculator" passHref>
             <span>Калькулятор</span>
         </Link>
         <Link href="/generator" passHref>
             <span>Генератор</span>
         </Link>
     </div>
     <div className={styles.badgeBox}>
         <p className={styles.userName}>{userName}</p>
         <div className={styles.userBadge}>{userName.substring(0, 1)}</div>
     </div>
    </div>
  );
};
