import { getTasksForDay } from "./getTasks";
import { groupTasksWithNames } from "./groupTasks";
import { taskTabI } from "./TaskDefinitions";

function getDistinctCategories(tabTasks: taskTabI){

}

async function loadTasksIntoTaskTabsByDate(date: Date = new Date()){
    const tasks = await getTasksForDay(date);

    const grouped: taskTabI[] = await groupTasksWithNames(tasks);


}