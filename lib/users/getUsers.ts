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

async function getUsernamesByIds(ids: string[]){
    await connectDB();

    const users: any = await FullUserModel.find({
        _id: { $in: ids }
    }).select("_id name email").lean().exec();

    if(users){
        users.forEach((user: any) => {
            user._id = user._id.toString();
        })

        return users;
    }

    return null;
}

export { getUsernameById, getUsernamesByIds };