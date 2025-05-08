import React from "react";
import { Splitter } from "antd";
import styles from "./Taskview.module.css";
import { taskTabI, taskI, taskTimeI } from "@/lib/tasks/TaskDefinitions";

const hourRange = {
    startAt: 0,
    endAt: 23,
    steps: 2
};

const hourBoxSize = 120;                                                                    // px
const boxBorder = 1;                                                                        // px
const boxSize = hourBoxSize / hourRange.steps;
const boxNumber = (hourRange.endAt - hourRange.startAt + 1) * hourRange.steps;
const taskTabWidth = 600;                                                                   // px
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
                        borderTop: `${boxBorder}px solid #AFAFAF`
                    }}></div>
                ))}
            </div>
            <div className={styles.content}>
                <Taskviewtimedisplay />
                <Splitter style={{
                    height: "auto"
                }}>
                    { children }
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
                top: 0,
                height: headerSize
            }}>
                <h2>{ title }</h2>
            </div>
            <div className={styles.tabtasks}>
                { children }
            </div>
        </Splitter.Panel>
    );
}


// components
export { Taskview, TaskTab };