import { connectDB } from "../db/db";
import { FullUserModel } from "@/models/FullUser";

async function getUsernameById(id: string){
    await connectDB();


}