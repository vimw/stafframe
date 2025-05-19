import { Taskview, TaskTab } from "./components/Taskview";
import { Task } from "@/app/components/Task";
import { taskTabs, loadTaskTabs } from "./components/ExampleTasks";
import { getUsernameById } from "@/lib/users/getUsers";
import { getTasksForDay } from "@/lib/tasks/getTasks";
import { groupTasks, groupTasksWithNames } from "@/lib/tasks/groupTasks";

export default async function Home() {
  console.log(await getTasksForDay());
  console.log(await groupTasksWithNames(await getTasksForDay()));

  return (
    <Taskview>
      {loadTaskTabs(taskTabs)}
    </Taskview>
  );
}
