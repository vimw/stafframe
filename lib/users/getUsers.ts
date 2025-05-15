import { connectDB } from "../db/db";
import { FullUserModel } from "@/models/FullUser";

async function getUsernameById(id: string){
    await connectDB();

    const user = await FullUserModel.findById(id, "_id name").lean();

    if(user){
        return user;
    }

    return null;
}