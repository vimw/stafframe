import { connectDB } from '@/lib/db/db';
import User from '@/models/User';
import { NextResponse } from 'next/server';
import sanitize from 'mongo-sanitize';
import { z } from 'zod';
import bcrypt from 'bcrypt'


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

const userSchema = z.object({
  name: z.string().min(1,'Name is required'),
  email: z.string().email('Invalid email'),
  department: z.string().min(1, 'Department is required'),
  position: z.string().min(1, 'Position is required'),
  joinDate: z.string(),
  avatar: z.string(),
  leaveBalance: z.object({
    annual: z.number().min(0, 'Annual leave must be 0 or more'),
    sick: z.number().min(0, 'Sick leave must be 0 or more'),
    personal: z.number().min(0, 'Personal leave must be 0 or more'),
  }),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  role: z.enum(['user', 'manager']).optional()
});


export async function POST(request: Request){
    try{
        await connectDB()
        const data = {
            ...await request.json(),
            avatar: '/profile_picture.jpg'
        }

        const sanitized = sanitize(data)
        const parsed = userSchema.safeParse(sanitized)

        if(!parsed.success){
            const flattened = parsed.error.flatten()
            const fieldErrors: Record<string, string> = {}

            Object.entries(flattened.fieldErrors).forEach(([field, messages]) => {
                if (messages && messages.length > 0) {
                fieldErrors[field] = messages[0]
                }
            })
            return NextResponse.json({ errors: fieldErrors }, { status: 400 })
        }

        const saltRounds = 12;
        const hashedPassword = await bcrypt.hash(parsed.data.password,saltRounds)


    
    const userToSave = {
        ...parsed.data,
        password: hashedPassword
    }

    console.log(userToSave)
    
    const newUser = new User(userToSave)
    await newUser.save();
    
        return NextResponse.json({message: 'User created'},{status: 201})
    } catch (error) {
        console.error('Error creating user:',error)
        return NextResponse.json({error: 'Server error'},{status: 500})
    }

}

const partialUserSchema = userSchema.partial()

export async function PATCH(request: Request){
    try{
        await connectDB()
        
        const { id, ...body } = await request.json();

        if (!id) {
            return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
        }

        const sanitized = sanitize(body)
        const parsed = partialUserSchema.safeParse(sanitized)

        if(!parsed.success){
            const flattened = parsed.error.flatten()
            const fieldErrors: Record<string, string> = {}

            Object.entries(flattened.fieldErrors).forEach(([field, messages]) => {
                if (messages && messages.length > 0) {
                fieldErrors[field] = messages[0]
                }
            })
            return NextResponse.json({ errors: fieldErrors }, { status: 400 })
        }

        const updateData = { ...parsed.data };

        const updatedUser = await User.findByIdAndUpdate(id,updateData, {
            new: true,
            runValidators: true,
        }).select('-password')

        if (!updatedUser) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }
    
        return NextResponse.json({message: 'User updated'},{status: 201})

    } catch (error) {
        console.error('Error creating user:',error)
        return NextResponse.json({error: 'Server error'},{status: 500})
    }

}