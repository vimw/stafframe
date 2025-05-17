
interface User{
  id:string,
  name:string,
  email:string,
  department:string,
  position:string,
  joinDate:string
}

interface paginatedUsersResponse {
  paginatedUsers: User[],
  totalCount: number
}


export async function fetchUsers(employees:string[],currentPage:number,pageSize:number): Promise<paginatedUsersResponse> {
    const employeeParams:string = employees.map((employee) => `search=${encodeURIComponent(employee)}`).join('&')
    const url:string = `/api/users?${employeeParams}&page=${currentPage}&pageSize=${pageSize}`

    try {
      const response: Response = await fetch(url);
      const data = await response.json()
      return {
        paginatedUsers: data.paginatedUsers,
        totalCount: data.totalCount
      }
    } catch (error){
        console.error('Failed to fetch leave requests',error)
    }
    return {
        paginatedUsers: [],
        totalCount: 0
    }
}