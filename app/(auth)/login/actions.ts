"use server";

import { z } from "zod";
import { redirect } from "next/navigation";
import { createSession, deleteSession } from "@/lib/session";
import { connectDB } from '@/lib/db/db'
import bcrypt from 'bcrypt'
import User from '@/models/User'


const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }).trim(),
  password: z
    .string()
    .trim(),
});

export async function login(prevState: any, formData: FormData) {
  const result = loginSchema.safeParse(Object.fromEntries(formData));

  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors,
    };
  }

  const {email,password} = result.data

  await connectDB()
  const user = await User.findOne({email})

  if(!user){
    return {
      errors: {
          email: ["Invalid email or password"]
      }
    }
  }

  const isPasswordCorrect = await bcrypt.compare(password,user.password);
  if(!isPasswordCorrect){
    return {
      errors: {
          email: ["Invalid email or password"]
      }
    }
  }


  await createSession(user._id.toString())
  redirect('/')

}

export async function logout() {
  await deleteSession();
  redirect('/login')
}