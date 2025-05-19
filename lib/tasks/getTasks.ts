import { getYDay } from "../time/yday";
import { TaskModel, RecurringTaskModel } from "@/models/Task";

async function getTasksForDay(date: Date = new Date()){
    let yday = getYDay(date);

    
}