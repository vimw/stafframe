import { taskI, taskTimeI } from "@/lib/tasks/TaskDefinitions";
import styles from "./Task.module.css";

type taskProps = Omit<taskI, 'desc'> & {
    children?: taskI['desc']
}

// niby niepotrzebne lecz dla blednych danych jakis fallback
const defaultTaskTime: taskTimeI = {
    hour: 8,
    minute: 0,
    length: 60
}

function verifyTaskTime(taskTime: taskTimeI){
    // verify if its in hourRange
    if(taskTime.hour < 0 || taskTime.hour > 23){
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

    // calculate the top
    let top: number = 0;
    top += taskTime.hour * hourBoxSize;
    top += taskTime.minute * (hourBoxSize / 60);

    // calculate the size
    let size: number = taskTime.length * (hourBoxSize / 60);

    return (
        <div className={styles.task} style={{
            top: top,
            height: size,
            backgroundColor: bgcolor
        }}>
            <h3>{ title }</h3>
            <p>{ children }</p>
        </div>
    );
}

export { Task };