import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db/db';
import User from '@/models/User';

export async function GET(request: Request){
    const { searchParams } = new URL(request.url)
    const search = searchParams.get('search')?.toLowerCase() || '';
    
    if(search.trim() === ''){
        return NextResponse.json([])
    }

    try{
        await connectDB()

        const query = {
            name: {$regex: search,$options: 'i'}
        }

        const users = await User.find(query)
            .lean()
            .select('-password')

        const formattedUsers = users.map((user) => ({
            name: user.name,
            id: user._id,
            avatar: user.avatar
        }))

        return new NextResponse(JSON.stringify(formattedUsers), {
        status: 200,
        headers: {
            'Content-Type': 'application/json',
            'Cache-Control': 'public, max-age=60'
        }
        })

    } catch (error){
        console.error('Error fetching users:', error);
        return NextResponse.json({ error: 'Server error' }, { status: 500 });
    }
}