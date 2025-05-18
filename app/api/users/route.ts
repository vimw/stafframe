import { NextResponse } from 'next/server';

const mockUsers = [
  { id: '1', name: 'Anna Kowalska', avatar: '/profile_picture.jpg',email: 'anna.kowalska@stafframe.com',department: 'Engineering',position: 'Software Developer', joinDate: '20.01.2020',leaveBalance: {annual:15,personal:15,sick:10} },
  { id: '2', name: 'Jan Nowak', avatar: '/profile_picture.jpg',email: 'jan.nowak@stafframe.com',department: 'Engineering',position: 'Software Developer', joinDate: '20.01.2020',leaveBalance: {annual:15,personal:15,sick:10} },
  { id: '3', name: 'Piotr Zieliński', avatar: '/profile_picture.jpg',email: 'piotr.zielinski@stafframe.com',department: 'Engineering',position: 'Software Developer', joinDate: '20.01.2020',leaveBalance: {annual:15,personal:15,sick:10} },
  { id: '4', name: 'Maria Wiśniewska', avatar: '/profile_picture.jpg',email: 'maria.wiesniewska@stafframe.com',department: 'Engineering',position: 'Software Developer', joinDate: '20.01.2020',leaveBalance: {annual:15,personal:15,sick:10} },
  { id: '5', name: 'Tomasz Kaczmarek', avatar: '/profile_picture.jpg',email: 'tomasz.kaczmarek@stafframe.com',department: 'Engineering',position: 'Software Developer', joinDate: '20.01.2020',leaveBalance: {annual:15,personal:15,sick:10} },
  { id: '6', name: 'Katarzyna Wójcik', avatar: '/profile_picture.jpg',email: 'katarzyna.wojcik@stafframe.com',department: 'Engineering',position: 'Software Developer', joinDate: '20.01.2020',leaveBalance: {annual:15,personal:15,sick:10} },
  { id: '7', name: 'Michał Lewandowski', avatar: '/profile_picture.jpg',email: 'michal.lewandowski@stafframe.com',department: 'Engineering',position: 'Software Developer', joinDate: '20.01.2020',leaveBalance: {annual:15,personal:15,sick:10} },
  { id: '8', name: 'Natalia Kamińska', avatar: '/profile_picture.jpg',email: 'natalia.kaminska@stafframe.com',department: 'Engineering',position: 'Software Developer', joinDate: '20.01.2020',leaveBalance: {annual:15,personal:15,sick:10} },
  { id: '9', name: 'Adam Nowicki', avatar: '/profile_picture.jpg',email: 'adam.nowicki@stafframe.com',department: 'Engineering',position: 'Software Developer', joinDate: '20.01.2020',leaveBalance: {annual:15,personal:15,sick:10} },
  { id: '10', name: 'Ewa Mazur', avatar: '/profile_picture.jpg',email: 'ewa.mazur@stafframe.com',department: 'Engineering',position: 'Software Developer', joinDate: '20.01.2020',leaveBalance: {annual:15,personal:15,sick:10} },
  { id: '11', name: 'Kamil Dąbrowski', avatar: '/profile_picture.jpg',email: 'kamil.dabrowski@stafframe.com',department: 'Engineering',position: 'Software Developer', joinDate: '20.01.2020',leaveBalance: {annual:15,personal:15,sick:10} },
  { id: '12', name: 'Agnieszka Piotrowska', avatar: '/profile_picture.jpg',email: 'agnieszka.piotrowska@stafframe.com',department: 'Engineering',position: 'Software Developer', joinDate: '20.01.2020',leaveBalance: {annual:15,personal:15,sick:10} },

];

interface data{
    id: string,
    name:string,
    email:string,
    department:string,
    position:string,
    joinDate:string
    leaveBalance: {
        annual: number
        sick: number
        personal: number
    }
}

const paginateData = (data: data[], page: number, pageSize: number) => {
    const start = (page - 1) * pageSize;
    const end = page * pageSize;
    return data.slice(start, end);
};

export async function GET(request: Request){
    const { searchParams } = new URL(request.url)
    const search = searchParams.getAll('search') || '';
    const page = parseInt(searchParams.get('page') || '1',10)
    const pageSize = parseInt(searchParams.get('pageSize') || '1',10)
    
    let filtered = mockUsers

    if(search.length > 0){
        filtered = filtered.filter((user) => 
            search.includes(user.id)
        )
    }

    const paginatedUsers = paginateData(filtered,page,pageSize)
    return NextResponse.json({
            paginatedUsers,
            totalCount: filtered.length
    })
}