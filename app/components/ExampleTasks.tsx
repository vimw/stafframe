import type { taskTabI } from "./Taskview"; // Use 'import type' for interfaces

const taskTabs: taskTabI[] = [
    {
        title: "Jan Kowalski",
        tasks: [
            {
                title: "Zrob nalesniki",
                desc: "Zrobi naleśniki dobre napewno",
                bgcolor: "red",
                taskTime: { hour: 8, minute: 0, length: 30 } // 8:00 - 8:30
            },
            {
                title: "Pracuj",
                desc: "Zaprogramuj widok grafiku",
                bgcolor: "purple",
                taskTime: { hour: 9, minute: 0, length: 120 } // 9:00 - 11:00
            },
            {
                title: "Spotkanie",
                desc: "Omówienie postępów projektu X",
                bgcolor: "blue",
                taskTime: { hour: 11, minute: 30, length: 60 } // 11:30 - 12:30
            }
        ]
    },
    {
        title: "Magda Magdalena",
        tasks: [
            {
                title: "Wstaje rano",
                bgcolor: "orange",
            },
            {
                title: "Kawa",
                desc: "Krótka przerwa na kawę",
                bgcolor: "brown",
                taskTime: { hour: 10, minute: 0, length: 15 } // 10:00 - 10:15
            },
            {
                title: "Raport",
                desc: "Przygotowanie raportu tygodniowego",
                bgcolor: "green",
                taskTime: { hour: 14, minute: 0, length: 90 } // 14:00 - 15:30
            }
        ]
    },
    {
        title: "Piotr Nowak",
        tasks: [
            {
                title: "Odpowiedzi na maile",
                desc: "Sprawdzenie skrzynki i odpowiedzi",
                bgcolor: "#3498db",
                taskTime: { hour: 7, minute: 45, length: 45 } // 7:45 - 8:30
            },
            {
                title: "Lunch",
                desc: "Przerwa obiadowa",
                bgcolor: "lime",
                taskTime: { hour: 12, minute: 30, length: 45 } // 12:30 - 13:15
            },
            {
                title: "Testowanie",
                desc: "Testowanie nowej funkcjonalności",
                bgcolor: "#f1c40f", // Example hex color
                taskTime: { hour: 15, minute: 0, length: 120 } // 15:00 - 17:00
            }
        ]
    },
    {
        title: "Anna Beztaskowska",
        tasks: []
    },
    {
        tasks: [
            {
                title: "Szkolenie",
                desc: "Szkolenie z bezpieczeństwa",
                bgcolor: "teal",
                taskTime: { hour: 16, minute: 0, length: 60 } // 16:00 - 17:00
            }
        ]
    }
];

export default taskTabs;
