import type { taskTabI } from "@/lib/tasks/TaskDefinitions"; // Use 'import type' for interfaces

const taskTabs: taskTabI[] = [
    {
        title: "Jan Kowalski",
        tasks: [
            {
                title: "Zrob nalesniki",
                desc: "Zrobi naleśniki dobre napewno",
                category: "Other",
                taskTime: { hour: 8, minute: 0, length: 30 } // 8:00 - 8:30
            },
            {
                title: "Pracuj",
                desc: "Zaprogramuj widok grafiku",
                category: "Work",
                taskTime: { hour: 9, minute: 0, length: 120 } // 9:00 - 11:00
            },
            {
                title: "Spotkanie",
                desc: "Omówienie postępów projektu X",
                category: "Meet",
                taskTime: { hour: 11, minute: 30, length: 60 } // 11:30 - 12:30
            }
        ]
    },
    {
        title: "Magda Magdalena",
        tasks: [
            {
                title: "Kawa",
                desc: "Krótka przerwa na kawę",
                category: "Break",
                taskTime: { hour: 10, minute: 0, length: 15 } // 10:00 - 10:15
            },
            {
                title: "Raport",
                desc: "Przygotowanie raportu tygodniowego",
                category: "Work",
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
                category: "Work",
                taskTime: { hour: 7, minute: 45, length: 45 } // 7:45 - 8:30
            },
            {
                title: "Lunch",
                desc: "Przerwa obiadowa",
                category: "Break",
                taskTime: { hour: 12, minute: 30, length: 45 } // 12:30 - 13:15
            },
            {
                title: "Testowanie",
                desc: "Testowanie nowej funkcjonalności",
                category: "Work",
                taskTime: { hour: 15, minute: 0, length: 120 } // 15:00 - 17:00
            }
        ]
    },
];

const distinctCategories = [
  ...new Set(
    taskTabs.flatMap(tab =>
      (tab.tasks ?? []).map(task => task.category)
    )
  )
];

export { taskTabs, distinctCategories };
