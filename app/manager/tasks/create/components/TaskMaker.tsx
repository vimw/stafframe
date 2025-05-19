"use client";

import styles from "./TaskMaker.module.css";
import { Input, Radio } from "antd";

function TaskMaker(){
    return (
        <div>
            <div style={styles.name}>
                <h4>Task Title:</h4>
                <Input />
            </div>
            <div style={styles.desc}>
                <h4>Task Description:</h4>
                <Input.TextArea />
            </div>
            <div style={styles.category}>
                <Radio.Group>
                    
                </Radio.Group>
            </div>
        </div>
    );
}

export { TaskMaker };