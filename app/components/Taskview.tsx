import React from "react";
import { Splitter, Typography, TypographyProps } from "antd";
import styles from "./Taskview.module.css";

interface taskTabI {
    title?: string,
    tasks?: taskI[]
}

interface taskI {
    title?: string,
    desc?: string,
    taskTime?: taskTimeI
}

interface taskTimeI {
    hour: number,
    minute: number,
    length: number
}

const hourRange = {
    startAt: 0,
    endAt: 23,
    steps: 2
};

const defaultTaskTime: taskTimeI = {
    hour: hourRange.startAt,
    minute: 0,
    length: 60
}

function verifyTaskTime(taskTime: taskTimeI){
    // verify if its in hourRange
    if(taskTime.hour < hourRange.startAt || taskTime.hour > hourRange.endAt){
        return false;
    }

    // verify if minutes are ok
    if(taskTime.minute < 0 || taskTime.minute > 59){
        return false;
    }

    return true;
}

const hourBoxSize = 120;                                                                    // px
const boxBorder = 1;                                                                        // px
const boxSize = hourBoxSize / hourRange.steps;
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

function Task({ title="New Task", taskTime=defaultTaskTime, children }: { title?: string, taskTime?: taskTimeI, children?: React.ReactNode }){
    // calculate if the provided taskTime is correct,
    // otherwise fallback to default
    if(!verifyTaskTime(taskTime)){
        taskTime = defaultTaskTime;
    }

    // calculate the top
    let top: number = 0;
    top += taskTime.hour * hourBoxSize;
    top += taskTime.minute * (hourBoxSize / 60);

    // calculate the size
    let size: number = taskTime.length * (hourBoxSize / 60);

    return (
        <div className={styles.task} style={{
            top: top,
            height: size
        }}>
            <h3>{ title }</h3>
            <p>{ children }</p>
        </div>
    );
}


// extras
function createTabsFromObject(tabs: taskTabI[]){
    return (
        <>
        {tabs.map((tab, tabIndex) => (
            <TaskTab key={tabIndex} title={tab.title ?? undefined}>
                { tab.tasks?.map((task, taskIndex) => (
                    <Task key={taskIndex} title={task.title ?? undefined} taskTime={task.taskTime ?? undefined}>
                        { task.desc }
                    </Task>
                )) }
            </TaskTab>
        ))}
        </>
    );
}

// components
export { Taskview, TaskTab, Task };

// functions
export { createTabsFromObject };

// interfaces
export type { taskTabI, taskI, taskTimeI };