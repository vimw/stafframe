import { TargetSelector } from "./components/TargetSelector";
import { TaskMaker } from "./components/TaskMaker";
import { TaskTimeMaker } from "./components/TaskTimeMaker";

export default function page(){
    return (
        <div>
            <div className="header">

            </div>
            <div className="main">
                <TargetSelector />
                <TaskMaker />
                <TaskTimeMaker />
            </div>
        </div>
    );
}