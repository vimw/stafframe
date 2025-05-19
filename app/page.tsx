import { Taskview, TaskTab } from "./components/Taskview";
import { Task } from "@/app/components/Task";
import { taskTabs, loadTaskTabs } from "./components/ExampleTasks";
import { getUsernameById } from "@/lib/users/getUsers";


export default async function Home() {
  getUsernameById("6825bbab5f7b117ef3122987");

  return (
    <Taskview>
      {loadTaskTabs(taskTabs)}
    </Taskview>
  );
}
