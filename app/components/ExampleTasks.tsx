import { taskTabI, taskI, taskTimeI } from "./Taskview";

const taskTabs: taskTabI[] = [
    {
        title: "Jan Kowalski",
        tasks: [
            {
                title: "Zrob nalesniki",
                desc: "Zrobi naleśniki dobre napewno bla bla",
                taskTime: {
                    hour: 8,
                    minute: 0,
                    length: 30
                }
            }
        ]
    }
];

export default taskTabs;