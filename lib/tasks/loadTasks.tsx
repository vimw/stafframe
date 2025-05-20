import { TaskTab } from "@/app/components/Taskview";
import { Task } from "@/app/components/Task";
import { getCategoriesByIds } from "./getCategories";
import { getTasksForDay } from "./getTasks";
import { groupTasksWithNames } from "./groupTasks";
import { taskTabI } from "./TaskDefinitions";

function getDistinctCategories(tabTasks: taskTabI[]){
    const c = new Set();

    tabTasks.forEach(el => {
        if(el.tasks !== undefined){
            el.tasks.forEach(task => {
                c.add(task.category);
            });
        }
    });

    // change set to array;
    return [...c] as string[];
}

async function loadTasksIntoTaskTabsByDate(date: Date = new Date()){
    const tasks = await getTasksForDay(date);

    const grouped: taskTabI[] = await groupTasksWithNames(tasks);

    const distinctCategories = getDistinctCategories(grouped);

    const categories = await getCategoriesByIds(distinctCategories);

    return (
        <>
        {grouped.map((tab, tabi) => {
            return (
                <TaskTab title={tab.title} key={tabi}>
                    {tab.tasks?.map((task, taski) => {
                        return (
                            <Task title={task.title} taskTime={task.taskTime} category={categories.get(task.category)} key={taski}>
                                {task.desc}
                            </Task>
                        );
                    })}
                </TaskTab>
            );
        })}
        </>
    );
}

export { loadTasksIntoTaskTabsByDate };