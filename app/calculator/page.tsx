"use client";
import React, {useEffect} from 'react';
import {Header} from "@/components/Header";
import {useUserStore} from "@/store/useUserStore";
import {useCalculatorStore} from "@/store/useCalculatorStore";
import Button from "@/components/Button";
import styles from './styles.module.scss'

const Calculator = () => {
    const userName = useUserStore((state) => state.userName);
    const {
        value,
        history,
        addInput,
        setOperator,
        calculate,
        reset,
        toggleSign,
        deleteLast,
        applyPercent
    } = useCalculatorStore();

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            const { key } = event;

            if (!isNaN(Number(key))) {
                addInput(key);
            }

            else if (key === '+') {
                setOperator('+');
            } else if (key === '-') {
                setOperator('-');
            } else if (key === '*') {
                setOperator('*');
            } else if (key === '/') {
                setOperator('/');
            }

            else if (key === 'Enter') {
                calculate();
            }

            else if (key === 'Backspace') {
                deleteLast();
            }

            else if (key === 'Escape') {
                reset();
            }

            else if (key === '%') {
                applyPercent();
            }

            else if (key === '±') {
                toggleSign();
            }
        };

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [addInput, setOperator, calculate, deleteLast, reset, applyPercent, toggleSign]);
    return (
        <div>
            <Header userName={userName}/>
            <div className={styles.calculator}>
                <div className={styles.history}>{history}</div>
                <div className={styles.display}>{value ? value : history}</div>
                <div className={styles.buttons}>
                    <Button style={styles.operatorApply} onClick={reset} label={'C'}/>
                    <Button style={styles.operatorApply} onClick={toggleSign} label={'±'}/>
                    <Button style={styles.operatorApply} onClick={applyPercent} label={'%'}></Button>
                    <Button style={styles.operatorSimple} onClick={() => setOperator('/')} label={'÷'}/>

                    <Button style={styles.numbers} onClick={() => addInput('7')} label={'7'}/>
                    <Button style={styles.numbers} onClick={() => addInput('8')} label={'8'}/>
                    <Button style={styles.numbers} onClick={() => addInput('9')} label={'9'}/>
                    <Button style={styles.operatorSimple} onClick={() => setOperator('*')} label={'×'}/>

                    <Button style={styles.numbers} onClick={() => addInput('4')} label={'4'}/>
                    <Button style={styles.numbers} onClick={() => addInput('5')} label={'5'}/>
                    <Button style={styles.numbers} onClick={() => addInput('6')} label={'6'}/>
                    <Button style={styles.operatorSimple} onClick={() => setOperator('-')} label={'−'}/>

                    <Button style={styles.numbers} onClick={() => addInput('1')} label={'1'}/>
                    <Button style={styles.numbers} onClick={() => addInput('2')} label={'2'}/>
                    <Button style={styles.numbers} onClick={() => addInput('3')} label={'3'}/>
                    <Button style={styles.operatorSimple} onClick={() => setOperator('+')} label={'+'}/>

                    <Button style={styles.numbers} onClick={() => addInput('0')} label={'0'}/>
                    <Button style={styles.numbers} onClick={deleteLast} label={'⌫'}/>
                    <Button style={styles.numbers} onClick={() => addInput('.')} label={'.'}/>
                    <Button style={styles.operatorSimple} onClick={calculate} label={'='}/>
                </div>
            </div>
        </div>
    );
};

export default Calculator;