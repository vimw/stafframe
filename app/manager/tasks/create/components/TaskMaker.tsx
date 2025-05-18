import styles from "./TaskMaker.module.css";
import { Input } from "antd";

const { TextArea } = Input;

function TaskMaker(){
    return (
        <div>
            <div style={styles.name}>
                
            </div>
            <div style={styles.desc}>

            </div>
            <div style={styles.category}>

            </div>
        </div>
    );
}

export { TaskMaker };