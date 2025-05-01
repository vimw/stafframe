import React from "react";
import { Splitter, Typography, TypographyProps } from "antd";
import styles from "./Taskview.module.css";

const hourRange = {
    startAt: 0,
    endAt: 23,
    steps: 2
};
const hourBoxSize = 120      // px
const hourBoxBorder = 1     // px
const boxSize = hourBoxSize / hourRange.steps - hourBoxBorder;
const boxNumber = (hourRange.endAt - hourRange.startAt + 1) * hourRange.steps;
const tasktabwidth = 200;

function Taskview({ children }: { children?: React.ReactNode }){
    return (
        <div className={styles.taskview}>
            <div className={styles.bg}>
                {Array.from({ length: boxNumber }).map((_, i) => (
                    <div key={i} style={{height: boxSize, borderTop: `${hourBoxBorder}px solid #AFAFAF`}}></div>
                ))}
            </div>
            <div className={styles.content}>
                <Taskviewtimedisplay />
                <Splitter>
                    {children}
                </Splitter>
            </div>
        </div>
    );
}

function Taskviewtimedisplay(){
    return (
        <div className={styles.hourdisplay}>
            {Array.from({ length: boxNumber}).map((_, i) => {
                let min = (i + hourRange.startAt) * (60 / hourRange.steps);
                return (
                    <div key={i} style={{height: boxSize}}>{Math.floor(min/60)}:{min%60 < 10 ? `0${min%60}` : min%60}</div>
                );
            })}
        </div>
    );
}

function TaskTab({ title="New Tab", children }: { title?: string, children?: React.ReactNode }){
    return (
        <Splitter.Panel className={styles.tab} defaultSize={tasktabwidth}>
            <div className={styles.tabtop}>
                <h2>{title}</h2>
            </div>
            <div className={styles.tabtasks}>
                {children}
            </div>
        </Splitter.Panel>
    );
}

function Task({ title="New Task", children }: { title?:string, children?: React.ReactNode }){
    return (
        <div className={styles.task}>
            <h3>{ title }</h3>
        </div>
    );
}

export { Taskview, TaskTab, Task };