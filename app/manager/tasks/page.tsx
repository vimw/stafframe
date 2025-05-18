import Link from "next/link";
import { TaskList } from "./components/Tasklist";

export default function page(){
    return (
        <div className="main">
            <div className="header">
                <h2>Manage Tasks</h2>
                <Link href="tasks/create"><span style={{fontSize: "1.4em", fontWeight: "bold"}}>+</span> Create</Link>
            </div>
            <div className="tasks">
                <TaskList />
            </div>
        </div>
    );
}