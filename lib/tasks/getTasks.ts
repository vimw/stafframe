import { connectDB } from "../db/db";
import { getYDay } from "../time/yday";
import { TaskModel, RecurringTaskModel } from "@/models/Task";

async function getTasksForDay(date: Date = new Date()){
    let yday = getYDay(date);

    await connectDB();

    const tasksForDay: any[] = await TaskModel.find({
        taskStart: {
            yday: yday
        }
    }).lean().exec();

    tasksForDay.forEach(element => {
        element["_id"] = element["_id"].toString();
        if(element.taskTime._id){
            delete element.taskTime._id
        }
        element["category"] = element["category"].toString();
        element.targetIds = element.targetIds.map((el: any) => el.toString());
    });

    return tasksForDay as any[];
}

export { getTasksForDay };