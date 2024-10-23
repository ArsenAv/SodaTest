"use client";
import React from 'react';
import {Header} from "@/components/Header";
import {useUserStore} from "@/store/useUserStore";
import {usePasswordStore} from "@/store/usePasswordStore";
import Button from "@/components/Button";
import styles from './styles.module.scss'
const Generator = () => {
    const userName = useUserStore((state) => state.userName);

    const {
        length,
        useLower,
        useUpper,
        useNumbers,
        useSymbols,
        noRepeats,
        password,
        setLength,
        toggleUseLower,
        toggleUseNumbers,
        toggleUseUpper,
        toggleUseSymbols,
        toggleNoRepeats,
        setPassword,
    } = usePasswordStore();

    const generatePassword = () => {
        const lowerChars: string = 'abcdefghijklmnopqrstuvwxyz';
        const numberChars: string = '0123456789';
        const upperChars: string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const symbolChars: string = '!@#$%^&*()_+[]{}|;:,.<>?';

        let charSet: string = '';
        if (useUpper) charSet += upperChars;
        if (useLower) charSet += lowerChars;
        if (useNumbers) charSet += numberChars;
        if (useSymbols) charSet += symbolChars;

        let generatedPassword: string = '';
        const uniqueChars:Set<string> = new Set();

        for (let i: number = 0; i < length; i++) {
            let char: string = charSet.charAt(Math.floor(Math.random() * charSet.length));
            if (noRepeats) {
                while (uniqueChars.has(char) && generatedPassword.length < charSet.length) {
                    char = charSet.charAt(Math.floor(Math.random() * charSet.length));
                }
                uniqueChars.add(char);
            }
            generatedPassword += char;
        }

        setPassword([...password, generatedPassword]);
    };
    return (
        <div>
            <Header userName={userName}/>
            <div className={styles.main}>
                <div className={styles.box}>
                    <h1>Генератор пароля</h1>
                    <div className={styles.options}>
                        <label className={styles.inputNumberLabel}>
                            Длина пароля:
                            <input
                                type="number"
                                value={length}
                                min="1"
                                className={styles.inputNumber}
                                onChange={(e) => setLength(Number(e.target.value))}
                            />
                        </label>
                        <label className={styles.inputNumberLabel}>
                            <input
                                type="checkbox"
                                checked={useUpper}
                                onChange={toggleUseUpper}
                                className={styles.inputCheckBox}
                            />
                            Использовать прописные буквы
                        </label>
                        <label className={styles.inputNumberLabel}>
                            <input
                                type="checkbox"
                                checked={useLower}
                                onChange={toggleUseLower}
                                className={styles.inputCheckBox}
                            />
                            Использовать строчные буквы
                        </label>
                        <label className={styles.inputNumberLabel}>
                            <input
                                type="checkbox"
                                checked={useNumbers}
                                className={styles.inputCheckBox}
                                onChange={toggleUseNumbers}
                            />
                            Использовать цифры
                        </label>
                        <label className={styles.inputNumberLabel}>
                            <input
                                type="checkbox"
                                checked={useSymbols}
                                onChange={toggleUseSymbols}
                                className={styles.inputCheckBox}
                            />
                            Использовать символы
                        </label>
                        <label className={styles.inputNumberLabel}>
                            <input
                                type="checkbox"
                                checked={noRepeats}
                                className={styles.inputCheckBox}
                                onChange={toggleNoRepeats}
                            />
                            Избегать повторения
                        </label>
                    </div>
                    <Button style={styles.button} onClick={generatePassword} label={'Сгенерировать пароль'}/>
                </div>
                    <div className={styles.passwordBoxWrraper}>
                        {password.length ? password.map(item => {
                           return <div className={styles.passwordBox} key={item}>
                               <div>{item}</div>
                               <div onClick={() => navigator.clipboard.writeText(item)} className={styles.copy}>
                                   <img src="/Container.svg" alt=""/>
                               </div>
                           </div>
                        }) : null}
                    </div>
            </div>
        </div>
    );
};

export default Generator;