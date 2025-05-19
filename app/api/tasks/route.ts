import { NextResponse } from "next/server";


const mockTasks = [
    {
        id: "682b31f88ed689599085fa22",
        title: "Programowanie backendu",
        desc: "Programowanie backendu w nextjs",
        category: "Work",
        taskStart: {
            yday: 139
        },
        taskTime: {
            hour: 9,
            minute: 0,
            length: 120
        },
        targetType: "user",
        targetIds: ["6825bbab5f7b117ef3122987"],
        isRecurring: true,
        employeeNames: ['Kuba Kowalski'],
        startDate: "2025-05-19",
        startTime: "09:00",
        dueDate: "2025-05-19",
        dueTime: "11:00"
    },
    {
        id: "682b31f88ed689599085fa23",
        title: "Design system review",
        desc: "Przejrzenie i zatwierdzenie komponentów UI",
        category: "Other",
        taskStart: {
            yday: 140
        },
        taskTime: {
            hour: 11,
            minute: 30,
            length: 90
        },
        targetType: "user",
        targetIds: ["6825bbab5f7b117ef3122988"],
        isRecurring: true,
        employeeNames: ['Adam Kowalski'],
        startDate: "2025-05-19",
        startTime: "09:00",
        dueDate: "2025-05-19",
        dueTime: "11:00"
    },
    {
        id: "682b31f88ed689599085fa24",
        title: "Daily stand-up",
        desc: "Codzienne spotkanie zespołu projektowego",
        category: "Break",
        taskStart: {
            yday: 140
        },
        taskTime: {
            hour: 10,
            minute: 0,
            length: 15
        },
        targetType: "user",
        targetIds: ["6825bbab5f7b117ef3122987", "6825bbab5f7b117ef3122988"],
        isRecurring: false,
        employeeNames: ['Adam Nowak','Jan Kowalski'],
        startDate: "2025-05-19",
        startTime: "09:00",
        dueDate: "2025-05-19",
        dueTime: "11:00"
    },
    {
        id: "682b31f88ed689599085fa25",
        title: "Bugfix: login redirect",
        desc: "Naprawa błędu z przekierowaniem po zalogowaniu",
        category: "Meet",
        taskStart: {
            yday: 141
        },
        taskTime: {
            hour: 13,
            minute: 0,
            length: 60
        },
        targetType: "user",
        targetIds: ["6825bbab5f7b117ef3122989"],
        isRecurring: false,
        employeeNames: ['Jan Kowalski'],
        startDate: "2025-05-19",
        startTime: "09:00",
        dueDate: "2025-05-19",
        dueTime: "11:00"
    },
    {
        id: "682b31f88ed689599085fa26",
        title: "Testy jednostkowe frontend",
        desc: "Pisanie testów do komponentów React",
        category: "Work",
        taskStart: {
            yday: 141
        },
        taskTime: {
            hour: 14,
            minute: 15,
            length: 90
        },
        targetType: "user",
        targetIds: ["6825bbab5f7b117ef3122987"],
        isRecurring: true,
        employeeNames: ['Adam Nowak'],
        startDate: "2025-05-19",
        startTime: "09:00",
        dueDate: "2025-05-19",
        dueTime: "11:00"
    },
    {
    id: "1",
    title: "Frontend refactor",
    desc: "Refaktoryzacja komponentów React",
    category: "Work",
    taskStart: { yday: 140 },
    taskTime: { hour: 10, minute: 30, length: 90 },
    targetType: "user",
    targetIds: ["6825bbab5f7b117ef3122987"],
    isRecurring: false,
    employeeNames: ["Kuba Kowalski"],
    startDate: "2025-05-20",
    startTime: "10:30",
    dueDate: "2025-05-20",
    dueTime: "12:00"
  },
  {
    id: "2",
    title: "Spotkanie zespołu",
    desc: "Cotygodniowe spotkanie statusowe",
    category: "Meet",
    taskStart: { yday: 140 },
    taskTime: { hour: 14, minute: 0, length: 60 },
    targetType: "team",
    targetIds: ["team-dev"],
    isRecurring: true,
    employeeNames: ["Zespół Dev"],
    startDate: "2025-05-20",
    startTime: "14:00",
    dueDate: "2025-05-20",
    dueTime: "15:00"
  },
  {
    id: "3",
    title: "Testy jednostkowe",
    desc: "Tworzenie testów dla modułu autoryzacji",
    category: "Work",
    taskStart: { yday: 141 },
    taskTime: { hour: 11, minute: 0, length: 120 },
    targetType: "user",
    targetIds: ["user123"],
    isRecurring: false,
    employeeNames: ["Anna Nowak"],
    startDate: "2025-05-21",
    startTime: "11:00",
    dueDate: "2025-05-21",
    dueTime: "13:00"
  },
  {
    id: "4",
    title: "Przerwa lunchowa",
    desc: "Czas na odpoczynek i posiłek",
    category: "Break",
    taskStart: { yday: 141 },
    taskTime: { hour: 13, minute: 0, length: 60 },
    targetType: "user",
    targetIds: ["user124"],
    isRecurring: true,
    employeeNames: ["Paweł Zięba"],
    startDate: "2025-05-21",
    startTime: "13:00",
    dueDate: "2025-05-21",
    dueTime: "14:00"
  },
  {
    id: "5",
    title: "Planowanie sprintu",
    desc: "Spotkanie planujące sprint",
    category: "Meet",
    taskStart: { yday: 142 },
    taskTime: { hour: 15, minute: 0, length: 90 },
    targetType: "team",
    targetIds: ["team-dev"],
    isRecurring: false,
    employeeNames: ["Zespół Dev"],
    startDate: "2025-05-22",
    startTime: "15:00",
    dueDate: "2025-05-22",
    dueTime: "16:30"
  },
  {
    id: "6",
    title: "Dokumentacja API",
    desc: "Uzupełnianie dokumentacji OpenAPI",
    category: "Work",
    taskStart: { yday: 143 },
    taskTime: { hour: 9, minute: 30, length: 150 },
    targetType: "user",
    targetIds: ["user125"],
    isRecurring: false,
    employeeNames: ["Monika Zielińska"],
    startDate: "2025-05-23",
    startTime: "09:30",
    dueDate: "2025-05-23",
    dueTime: "12:00"
  },
  {
    id: "7",
    title: "Code review",
    desc: "Przegląd kodu nowego modułu",
    category: "Work",
    taskStart: { yday: 144 },
    taskTime: { hour: 10, minute: 0, length: 60 },
    targetType: "user",
    targetIds: ["user126"],
    isRecurring: false,
    employeeNames: ["Tomasz Wiśniewski"],
    startDate: "2025-05-24",
    startTime: "10:00",
    dueDate: "2025-05-24",
    dueTime: "11:00"
  },
  {
    id: "8",
    title: "Daily stand-up",
    desc: "Codzienne krótkie spotkanie zespołu",
    category: "Meet",
    taskStart: { yday: 144 },
    taskTime: { hour: 9, minute: 0, length: 15 },
    targetType: "team",
    targetIds: ["team-dev"],
    isRecurring: true,
    employeeNames: ["Zespół Dev"],
    startDate: "2025-05-24",
    startTime: "09:00",
    dueDate: "2025-05-24",
    dueTime: "09:15"
  },
  {
    id: "9",
    title: "Mentoring",
    desc: "Sesja mentoringowa dla juniorów",
    category: "Other",
    taskStart: { yday: 145 },
    taskTime: { hour: 16, minute: 0, length: 60 },
    targetType: "user",
    targetIds: ["user127"],
    isRecurring: false,
    employeeNames: ["Ewa Maj"],
    startDate: "2025-05-25",
    startTime: "16:00",
    dueDate: "2025-05-25",
    dueTime: "17:00"
  },
  {
    id: "10",
    title: "Deployment",
    desc: "Wdrożenie nowej wersji aplikacji",
    category: "Work",
    taskStart: { yday: 145 },
    taskTime: { hour: 18, minute: 0, length: 90 },
    targetType: "user",
    targetIds: ["user128"],
    isRecurring: false,
    employeeNames: ["Jan Kowalczyk"],
    startDate: "2025-05-25",
    startTime: "18:00",
    dueDate: "2025-05-25",
    dueTime: "19:30"
  }
]

const paginateData = (data: any[], page: number, pageSize: number) => {
    const start = (page - 1) * pageSize;
    const end = page * pageSize;
    return data.slice(start, end);
};

export async function GET(request: Request) {
    const {searchParams} = new URL(request.url)
    const search = searchParams.get('search')?.toLowerCase() || '';
    const employee = searchParams.getAll('employee')?.map((lt) => lt.toLowerCase()) || ''
    const category = searchParams.get('category')?.toLowerCase() || '';
    const page = parseInt(searchParams.get('page') || '1',10)
    const pageSize = parseInt(searchParams.get('pageSize') || '1',10)

    let filteredTasks = mockTasks;

    if(search !== ''){
        filteredTasks = filteredTasks.filter((task) => 
            task.title.toLowerCase().includes(search)
        )
    }

    if(employee.length > 0){
        filteredTasks = filteredTasks.filter((task) => 
            task.targetIds.some((id) => employee.includes(id.toLowerCase()))
        )
    }

    

    if(category !== ''){
        filteredTasks = filteredTasks.filter((task) => 
            category.includes(task.category.toLowerCase())
        )
    }

    const paginatedTasks = paginateData(filteredTasks, page, pageSize);
    console.log(paginatedTasks)

    return NextResponse.json({
        paginatedTasks,
        totalCount: filteredTasks.length
    })
    
}