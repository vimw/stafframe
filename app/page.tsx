import { Taskview, TaskTab } from "./components/Taskview";
import { Task } from "@/app/components/Task";
import { taskTabs, loadTaskTabs } from "./components/ExampleTasks";

export default async function Home() {
  return (
    <Taskview>
      {loadTaskTabs(taskTabs)}
    </Taskview>
  );
}
