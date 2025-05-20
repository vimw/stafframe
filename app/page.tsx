import { Taskview } from "./components/Taskview";
import { loadTasksIntoTaskTabsByDate } from "@/lib/tasks/loadTasks";

export default async function Home() {

  return (
    <Taskview>
      {loadTasksIntoTaskTabsByDate()}
    </Taskview>
  );
}
