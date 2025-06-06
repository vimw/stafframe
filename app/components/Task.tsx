"use client";

import conf from "@/config";
import { useContext } from "react";
import { taskI, taskTimeI } from "@/lib/tasks/TaskDefinitions";
import { TaskStyles } from "./Taskview";
import styles from "./Task.module.css";
import { Popover } from "antd";

type taskProps = Omit<taskI, 'desc'> & {
    children?: taskI['desc']
}

// niby niepotrzebne lecz dla blednych danych jakis fallback
const defaultTaskTime: taskTimeI = {
    hour: conf.hourRange.startAt ?? 0,
    minute: 0,
    length: 60
}

function verifyTaskTime(taskTime: taskTimeI){
    // verify if its in hourRange
    if(taskTime.hour < (conf.hourRange.startAt ?? 0) || taskTime.hour > (conf.hourRange.endAt ?? 23)){
        return false;
    }

    // verify if minutes are ok
    if(taskTime.minute < 0 || taskTime.minute > 59){
        return false;
    }

    return true;
}

function Task({ title, category, taskTime, children }: taskProps){
    // calculate if the provided taskTime is correct,
    // otherwise fallback to default
    if(!verifyTaskTime(taskTime)){
        taskTime = defaultTaskTime;
    }

    const { hourBoxSize, boxBorder, boxSize } = useContext(TaskStyles);

    // calculate the top
    let top: number = 0;
    top += (taskTime.hour - conf.hourRange.startAt) * hourBoxSize;
    top += taskTime.minute * (hourBoxSize / 60);

    // calculate the size
    const size: number = taskTime.length * (hourBoxSize / 60);

    return (
        <Popover title={<span style={{color: "white"}}>{title}</span>} content={<div style={{maxWidth: "16rem", color: "white"}}><p>Category: {category.name}</p><p>{children}</p></div>} placement="rightTop" color="#181818">
        <div className={styles.task} style={{
                top: top,
                height: size,
                backgroundColor: category.bgColor ?? "red",
                color: category.color ?? "white"
            }}>
                <h3>{ title }</h3>
                <p>{ children }</p>
        </div>
        </Popover>
    );
}

export { Task };