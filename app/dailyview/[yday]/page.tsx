import { getDateFromYDay } from "@/lib/time/yday";
import { Taskview } from "../../components/Taskview";
import { loadTasksIntoTaskTabsByDate } from "@/lib/tasks/loadTasks";

export default async function Home({ params }: { params: any }) {
    const paramss = await params;
    const yday = parseInt(paramss.yday);

  return (
    <Taskview yday={yday}>
      {loadTasksIntoTaskTabsByDate(getDateFromYDay(yday))}
    </Taskview>
  );
}
