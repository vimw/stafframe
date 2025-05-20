"use client";

import { getDateFromYDay, getYDay } from "@/lib/time/yday";
import { Button } from "antd";
import styles from "./TaskviewNavigation.module.css";

function TaskviewNavigation({ yday }: { yday?: number }){
    const ydayNow = getYDay();
    const ydayFr = yday ?? ydayNow;
    const ydayDate = getDateFromYDay(ydayFr);

    return (
        <div className={styles.navbar}>
            <p>Dailyview for: </p>
            <h2>{`${ydayDate.getDate()}-${ydayDate.getMonth()+1}-${ydayDate.getFullYear()}`}</h2>
            <Button type="default" shape="round" size="large" href={`/dailyview/${ydayFr-1 < 1 ? 365 : ydayFr-1}`}>Prev</Button>
            <Button type="default" shape="round" size="large" href={`/dailyview/${ydayFr+1 > 365 ? 1 : ydayFr+1}`}>Next</Button>
        </div>
    );
}

export { TaskviewNavigation };