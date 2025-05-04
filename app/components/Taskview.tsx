import React from "react";
import { Splitter, Typography, TypographyProps } from "antd";
import styles from "./Taskview.module.css";

const hourRange = {
    startAt: 0,
    endAt: 23,
    steps: 2
};
const hourBoxSize = 120                                                                     // px
const hourBoxBorder = 1                                                                     // px
const boxSize = hourBoxSize / hourRange.steps - hourBoxBorder;
const boxNumber = (hourRange.endAt - hourRange.startAt + 1) * hourRange.steps;
const taskTabWidth = 200;                                                                   // px
const taskViewPadding = 4;                                                                  // px
const headerSize = 64;                                                                      // px

function Taskview({ children }: { children?: React.ReactNode }){
    return (
        <div className={styles.taskview} style={{
            padding: taskViewPadding
        }}>
            <div className={styles.bg} style={{
                top: taskViewPadding + headerSize,
                left: taskViewPadding
            }}>
                {Array.from({ length: boxNumber }).map((_, i) => (
                    <div key={i} style={{
                        height: boxSize,
                        borderTop: `${hourBoxBorder}px solid #AFAFAF`
                    }}></div>
                ))}
            </div>
            <div className={styles.content}>
                <Taskviewtimedisplay />
                <Splitter style={{flexGrow: 1, width: "0", height: "100%"}}>
                    {children}
                </Splitter>
            </div>
        </div>
    );
}

function Taskviewtimedisplay(){
    return (
        <div className={styles.hourdisplay} style={{
            marginTop: headerSize
        }}>
            {Array.from({ length: boxNumber}).map((_, i) => {
                let min = (i + hourRange.startAt) * (60 / hourRange.steps);
                return (
                    <div key={i} style={{
                        height: boxSize
                    }}>{Math.floor(min/60)}:{min%60 < 10 ? `0${min%60}` : min%60}</div>
                );
            })}
        </div>
    );
}

function TaskTab({ title="New Tab", children }: { title?: string, children?: React.ReactNode }){
    return (
        <Splitter.Panel className={styles.tab} defaultSize={taskTabWidth}>
            <div className={styles.tabtop} style={{
                top: taskViewPadding,
                height: headerSize
            }}>
                <h2>{title}</h2>
            </div>
            <div className={styles.tabtasks}>
                {children}
            </div>
        </Splitter.Panel>
    );
}

function Task({ title="New Task", start="8:00", length=60, children }: { title?:string, start?:string, length?: number, children?: React.ReactNode }){
    return (
        <div className={styles.task}>
            <h3>{ title }</h3>
        </div>
    );
}

export { Taskview, TaskTab, Task };