import { NextResponse } from 'next/server';

const mockUsers = [
  { id: '1', name: 'Anna Kowalska', avatar: '/profile_picture.jpg' },
  { id: '2', name: 'Jan Nowak', avatar: '/profile_picture.jpg' },
  { id: '3', name: 'Piotr Zieliński', avatar: '/profile_picture.jpg' },
  { id: '4', name: 'Maria Wiśniewska', avatar: '/profile_picture.jpg' },
  { id: '5', name: 'Tomasz Kaczmarek', avatar: '/profile_picture.jpg' },
  { id: '6', name: 'Katarzyna Wójcik', avatar: '/profile_picture.jpg' },
  { id: '7', name: 'Michał Lewandowski', avatar: '/profile_picture.jpg' },
  { id: '8', name: 'Natalia Kamińska', avatar: '/profile_picture.jpg' },
  { id: '9', name: 'Adam Nowicki', avatar: '/profile_picture.jpg' },
  { id: '10', name: 'Ewa Mazur', avatar: '/profile_picture.jpg' },
  { id: '11', name: 'Kamil Dąbrowski', avatar: '/profile_picture.jpg' },
  { id: '12', name: 'Agnieszka Piotrowska', avatar: '/profile_picture.jpg' },

];

export async function GET(request: Request){
    const { searchParams } = new URL(request.url)
    const search = searchParams.get('search')?.toLowerCase() || '';

    if(search.trim() === ''){
        return NextResponse.json([])
    }

    const filtered = mockUsers.filter((user) => 
        user.name.toLowerCase().includes(search)
    )

    return NextResponse.json(filtered)
}