"use client";
import React from "react";
import {Input} from "@/components/Input";
import {useUserStore} from '../store/useUserStore';
import Button from "@/components/Button";
import {useRouter} from "next/navigation";
import styles from "./styles.module.scss";



export default function Home() {
  const router = useRouter();
  const { userName, setUserName } = useUserStore();
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const value: string = event.target.value
      const storageValue = localStorage.getItem('userName')

      if (storageValue && storageValue.length) {
          setUserName(storageValue)
      }

      setUserName(value);
      localStorage.setItem('userName', value)
  };
  const handleNavigateCalc = (): void => {
      if (!userName.length) {
          setUserName('Гость')
      }
      router.push('/calculator')
  }
  const handleNavigateGen = (): void => {
      if (!userName.length) {
          setUserName('Гость')
      }
      router.push('/generator')
  }


  return (
    <div className={styles.page}>
       <div className={styles.main}>
           <h3 className={styles.title}>Начать</h3>
           <label className={styles.label}>Напишиете ваше имя</label>
           <Input onChange={handleChange} value={userName}/>
           <div className={styles.buttonBox}>
               <Button style={styles.button} label={'Открыть калькулятор'} onClick={handleNavigateCalc}/>
               <Button style={styles.button} label={'Открыть генератор'} onClick={handleNavigateGen}/>
           </div>
       </div>
    </div>
  );
}
