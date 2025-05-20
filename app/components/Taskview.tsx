"use client";

import conf from "@/config";
import React from "react";
import { createContext, useMemo } from "react";
import styles from "./Taskview.module.css";
import { taskTabI, taskI, taskTimeI } from "@/lib/tasks/TaskDefinitions";
import { TaskviewNavigation } from "./TaskviewNavigation";

const hourRange = {
    startAt: conf.hourRange.startAt ?? 0,
    endAt: conf.hourRange.endAt ?? 23,
    steps: conf.hourRange.steps ?? 2
};

// styles
const taskViewPadding = 4;                                                                  // px
const taskTabWidth = 400;                                                                   // px
const headerSize = 64;                                                                      // px

const hourBoxSize = 120;                                                                    // px
const boxBorder = 1;                                                                        // px
const boxSize = hourBoxSize / hourRange.steps;                                              // px

const TaskStyles = createContext({
    hourBoxSize: hourBoxSize,
    boxBorder: boxBorder,
    boxSize: boxSize
});

// misc
const boxNumber = (hourRange.endAt - hourRange.startAt + 1) * hourRange.steps;


function Taskview({ children }: { children?: React.ReactNode }){
    return (
        <div className={styles.taskview} style={{
            padding: taskViewPadding
        }}>
            <div className={styles.nav}>
                <TaskviewNavigation />
            </div>
            <div className={styles.main}>
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
                    { children }
                </div>
            </div>
        </div>
    );
}

function Taskviewtimedisplay(){
    const interval = 60 / hourRange.steps;

    return (
        <div className={styles.hourdisplay} style={{
            marginTop: headerSize
        }}>
            {Array.from({ length: boxNumber}).map((_, i) => {
                const totalMin = hourRange.startAt * 60 + i * interval;
                const H = Math.floor(totalMin / 60);
                const M = Math.floor(totalMin % 60).toString().padStart(2, "0");
                return (
                    <div key={i} style={{ height: boxSize }}>
                        {H}:{M}
                    </div>
                );
            })}
        </div>
    );
}

function TaskTab({ title="New Tab", children }: { title?: string, children?: React.ReactNode }){
    const styleVars = useMemo(
        () => ({
          hourBoxSize,
          boxBorder,
          boxSize
        }),
        [hourBoxSize, boxBorder, boxSize]
      );

    return (
        <div className={styles.tab} style={{
            width: taskTabWidth
        }}>
            <div className={styles.tabtop} style={{
                top: 0,
                height: headerSize
            }}>
                <h2>{ title }</h2>
            </div>
            <div className={styles.tabtasks}>
                <TaskStyles.Provider value={styleVars}>
                    { children }
                </TaskStyles.Provider>
            </div>
        </div>
    );
}


// components
export { Taskview, TaskTab };

// misc
export { TaskStyles }