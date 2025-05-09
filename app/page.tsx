import { Taskview, TaskTab } from "./components/Taskview";
import { Task } from "@/app/components/Task";
import exampleTasks from "./components/ExampleTasks";

export default function Home() {
  return (
    <Taskview>
      <TaskTab>
        <Task title="Śniadanie" category="Work" taskTime={{hour: 8, minute: 0, length: 60}}>
          Opis
        </Task>
      </TaskTab>
    </Taskview>
  );
}
