import { Taskview, TaskTab } from "./components/Taskview";
import { Task } from "@/app/components/Task";
import { taskTabs, loadTaskTabs } from "./components/ExampleTasks";
import { getUsernameById } from "@/lib/users/getUsers";
import { getTasksForDay } from "@/lib/tasks/getTasks";
import { groupTasks, groupTasksWithNames } from "@/lib/tasks/groupTasks";
import { getCategoriesByIds } from "@/lib/tasks/getCategories";
import { getYDay } from "@/lib/time/yday";

export default async function Home() {

  return (
    <Taskview>
      {loadTaskTabs(taskTabs)}
    </Taskview>
  );
}
