import { connectDB } from "../db/db";
import { getUsernameById } from "../users/getUsers";

function groupTasks(taskArray: any[]): any[]{
    const m = new Map();

    taskArray.forEach((el) => {
        if(el.targetIds !== undefined){
            el.targetIds.forEach((id: any) => {
                const arr = m.get(id) || [];
                arr.push(stripTargetIds(el));
                m.set(id, arr);
            })
        }
    });

    return Array.from(m, ([id, tasks]) => ({ id, tasks }));
}

async function groupTasksWithNames(taskArray: any[]){
    const grouped: any[] = groupTasks(taskArray);

    await connectDB();

    for(const el of grouped){
        el.name = (await getUsernameById(el.id)).name;
        delete el.id;
    }

    return grouped as any[];
}

function stripTargetIds(obj: any){
    const { taskStart, targetType, targetIds, ...rest } = obj;
    return rest;
}

export { groupTasks, groupTasksWithNames };