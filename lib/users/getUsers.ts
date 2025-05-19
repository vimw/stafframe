import { connectDB } from "../db/db";
import { FullUserModel } from "@/models/FullUser";

async function getUsernameById(id: string){
    await connectDB();

    const user: any = await FullUserModel.findById(id, "_id name email").lean().exec();

    if(user){
        user["_id"] = user["_id"].toString();

        return user;
    }

    return null;
}

export { getUsernameById };