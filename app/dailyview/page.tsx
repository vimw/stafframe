import { Taskview } from "../components/Taskview";
import { loadTasksIntoTaskTabsByDate } from "@/lib/tasks/loadTasks";

export const metadata = {
  title: "Stafframe | Dailyview"
}

export default async function Home() {

  return (
    <Taskview>
      {loadTasksIntoTaskTabsByDate()}
    </Taskview>
  );
}
