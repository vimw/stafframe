import { taskTabI } from "./Taskview";

const taskTabs: taskTabI[] = [
    {
        title: "Jan Kowalski",
        tasks: [
            {
                title: "Zrob nalesniki",
                desc: "Zrobi naleśniki dobre napewno bla bla",
                bgcolor: "red",
                taskTime: {
                    hour: 8,
                    minute: 0,
                    length: 30
                }
            },
            {
                title: "Pracuj",
                desc: "Zaprogramuj widok grafiku",
                bgcolor: "purple",
                taskTime: {
                    hour: 9,
                    minute: 0,
                    length: 120
                }
            }
        ]
    },
    {
        title: "Magda Magdalena",
        tasks: [
            {
                title: "Wstaje rano",
            }
        ]
    }
];

export default taskTabs;