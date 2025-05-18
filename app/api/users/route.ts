import { connectDB } from '@/lib/db/db';
import User from '@/models/User';
import { NextResponse } from 'next/server';


export async function GET(request: Request){
    try {
        await connectDB()
        const { searchParams } = new URL(request.url)
        const search = searchParams.getAll('search') || '';
        const page = parseInt(searchParams.get('page') || '1',10)
        const pageSize = parseInt(searchParams.get('pageSize') || '1',10)
        console.log(search)
    
        const query = search.length > 0 ? {
            _id: {$in: search}
        } : {}

        console.log(query)
    
        const totalCount = await User.countDocuments(query)
        const users = await User.find(query)
            .skip((page -1) * pageSize)
            .limit(pageSize)
            .lean()
            .select('-password')

        const usersWithId = users.map((user) => ({
            ...user,
            id: user._id,
            _id: undefined
        }))

        return NextResponse.json({paginatedUsers:usersWithId,totalCount})

    } catch (error) {
        console.error('Error fetching users:', error);
        return NextResponse.json({ error: 'Server error' }, { status: 500 });
    }
}