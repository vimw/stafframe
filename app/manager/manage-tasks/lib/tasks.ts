
interface Task{
  id:string,
  title:string,
  desc:string,
  category: string,
  taskStart: {
    yday:number
  },
  taskTime: {
    hour: number,
    minute: number,
    length: number
  },
  targetType: string,
  targetIds: string[],
  recurring?: boolean,
  employeeNames: string[],
  startDate: string,
  startTime: string,
  dueDate: string,
  dueTime: string
}

interface paginatedTaskResponse {
  paginatedTasks: Task[],
  totalCount: number
}


export async function fetchTasks(employees:string[],filteredTask:string,filteredCategory:string,currentPage:number,pageSize:number): Promise<paginatedTaskResponse> {
    const employeeParams:string = employees.map((employee) => `employee=${encodeURIComponent(employee)}`).join('&')
    const url:string = `/api/tasks?search=${filteredTask}&${employeeParams}&category=${filteredCategory}&page=${currentPage}&pageSize=${pageSize}`

    try {
      const response: Response = await fetch(url);
      const data = await response.json()
      return {
        paginatedTasks: data.paginatedTasks,
        totalCount: data.totalCount
      }
    } catch (error){
        console.error('Failed to fetch tasks',error)
    }
    return {
        paginatedTasks: [],
        totalCount: 0
    }
}