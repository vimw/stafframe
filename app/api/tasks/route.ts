import { NextResponse } from "next/server";


const mockTasks = [
    {
        id: "682b31f88ed689599085fa22",
        title: "Programowanie backendu",
        desc: "Programowanie backendu w nextjs",
        category: "681dc2590b1658e6fb042002",
        taskStart: {
            yday: 139
        },
        taskTime: {
            hour: 9,
            minute: 0,
            length: 120
        },
        targetType: "user",
        targetIds: ["6825bbab5f7b117ef3122987"]
    },
    {
        id: "682b31f88ed689599085fa23",
        title: "Design system review",
        desc: "Przejrzenie i zatwierdzenie komponentów UI",
        category: "681dc2590b1658e6fb042003",
        taskStart: {
            yday: 140
        },
        taskTime: {
            hour: 11,
            minute: 30,
            length: 90
        },
        targetType: "user",
        targetIds: ["6825bbab5f7b117ef3122988"]
    },
    {
        id: "682b31f88ed689599085fa24",
        title: "Daily stand-up",
        desc: "Codzienne spotkanie zespołu projektowego",
        category: "681dc2590b1658e6fb042004",
        taskStart: {
            yday: 140
        },
        taskTime: {
            hour: 10,
            minute: 0,
            length: 15
        },
        targetType: "user",
        targetIds: ["6825bbab5f7b117ef3122987", "6825bbab5f7b117ef3122988"]
    },
    {
        id: "682b31f88ed689599085fa25",
        title: "Bugfix: login redirect",
        desc: "Naprawa błędu z przekierowaniem po zalogowaniu",
        category: "681dc2590b1658e6fb042005",
        taskStart: {
            yday: 141
        },
        taskTime: {
            hour: 13,
            minute: 0,
            length: 60
        },
        targetType: "user",
        targetIds: ["6825bbab5f7b117ef3122989"]
    },
    {
        id: "682b31f88ed689599085fa26",
        title: "Testy jednostkowe frontend",
        desc: "Pisanie testów do komponentów React",
        category: "681dc2590b1658e6fb042006",
        taskStart: {
            yday: 141
        },
        taskTime: {
            hour: 14,
            minute: 15,
            length: 90
        },
        targetType: "user",
        targetIds: ["6825bbab5f7b117ef3122987"]
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
            search.includes(task.title.toLowerCase())
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