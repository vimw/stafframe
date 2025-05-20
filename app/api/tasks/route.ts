import { NextResponse } from "next/server";
import { TaskModel, RecurringTaskModel } from '@/models/Task'
import { CategoryModel } from '@/models/Categories'
import sanitize from 'mongo-sanitize';
import { connectDB } from '@/lib/db/db';
import mongoose from "mongoose";
import User from '@/models/User';


function getDateFromYDay(yday: number): string {
  const date = new Date(new Date().getFullYear(), 0);
  date.setDate(yday);
  return date.toISOString().split("T")[0];
}


export async function GET(request: Request) {
  await connectDB();
  const { searchParams } = new URL(request.url);
  const search = searchParams.get("search")?.toLowerCase() || "";
  const employeeIds = searchParams.getAll("employee");
  const category = searchParams.get("category")?.toLowerCase() || "";
  const page = parseInt(searchParams.get("page") || "1", 10);
  const pageSize = parseInt(searchParams.get("pageSize") || "10", 10);

  try {
    const query: any = {};

    if (search) {
      query.title = { $regex: search, $options: "i" };
    }

    if (employeeIds.length > 0) {
      query.targetIds = { $in: employeeIds };
    }

    if (category) {
      const foundCategory = await CategoryModel.findOne({ name: new RegExp(`^${category}$`, "i") });
      if (foundCategory) {
        query.category = foundCategory._id;
      } else {
        return NextResponse.json({ paginatedTasks: [], totalCount: 0 });
      }
    }

    const tasks = await TaskModel.find(query)
      .skip((page - 1) * pageSize)
      .limit(pageSize)
      .lean();

    const totalCount = await TaskModel.countDocuments(query);

    const categoryIds = [...new Set(tasks.map((task) => task.category?.toString()))];
    const userIds = [...new Set(tasks.flatMap((task) => task.targetIds.map(String)))];

    const categories = await CategoryModel.find({ _id: { $in: categoryIds } }).lean();
    const users = await User.find({ _id: { $in: userIds } }).lean();

    const categoryMap = Object.fromEntries(
        categories.map(cat => [String(cat._id), cat.name])
    );
    const userMap = Object.fromEntries(users.map(user => [String(user._id), `${user.name}`]));
    
    const formattedTasks = tasks.map((task: any) => {
      const startDate = getDateFromYDay(task.taskStart.yday);
      const start = new Date(startDate);
      start.setHours(task.taskTime.hour, task.taskTime.minute);

      const due = new Date(start.getTime() + task.taskTime.length * 60000);

      return {
        id: task._id.toString(),
        title: task.title,
        desc: task.desc,
        category: categoryMap[task.category?.toString()] || "Other",
        taskStart: task.taskStart,
        taskTime: task.taskTime,
        targetType: task.targetType,
        targetIds: task.targetIds,
        recurring: !!task.isRecurring,
        employeeNames: task.targetIds.map((id: string) => userMap[id] || "Unknown"),
        startDate: start.toISOString().split("T")[0],
        startTime: start.toTimeString().slice(0, 5),
        dueDate: due.toISOString().split("T")[0],
        dueTime: due.toTimeString().slice(0, 5),
        recurringType: task.recurringType || undefined,
        recurringEndDate: task.recurringEndDate ? task.recurringEndDate.toISOString().split("T")[0] : undefined,
        recurringDays: task.recurringDays
          ? task.recurringDays.split(",").map(Number)
          : undefined,
      };
    });

    return NextResponse.json({ paginatedTasks: formattedTasks, totalCount });
  } catch (error) {
    console.error("Failed to fetch tasks:", error);
    return NextResponse.json({ error: "Failed to fetch tasks" }, { status: 500 });
  }
}




function getYDay(date: Date): number {
  const startOfYear = new Date(date.getFullYear(), 0, 0);
  const diff = date.getTime() - startOfYear.getTime();
  const oneDay = 1000 * 60 * 60 * 24;
  return Math.floor(diff / oneDay);
}

function getDurationInMinutes(start: Date, end: Date): number {
  return Math.max(1, Math.round((end.getTime() - start.getTime()) / 60000));
}


export async function POST(request: Request){
  try {
      await connectDB();
      const rawData = await request.json();
      const data = sanitize(rawData);

      const {
        title,
        desc,
        category,
        startDate,
        startTime,
        dueDate,
        dueTime,
        targetType,
        targetIds,
        recurring,
        recurringType,
        recurringEndDate,
        recurringDays
      } = data;

      if (
        !title ||
        !category ||
        !startDate ||
        !startTime ||
        !dueDate ||
        !dueTime ||
        !targetType ||
        !Array.isArray(targetIds) ||
        targetIds.length === 0
      ) {
        return NextResponse.json(
          { error: "Missing required fields" },
          { status: 400 }
        );
      }

      let categoryId;
      if (mongoose.Types.ObjectId.isValid(category)) {
        categoryId = category;
      } else {
        const foundCategory = await CategoryModel.findOne({ name: category });
        if (!foundCategory) {
          return NextResponse.json(
            { error: `Category "${category}" not found` },
            { status: 400 }
          );
        }
        categoryId = foundCategory._id;
      }

      const startDateTime = new Date(`${startDate}T${startTime}`);
      const dueDateTime = new Date(`${dueDate}T${dueTime}`);

      if (isNaN(startDateTime.getTime()) || isNaN(dueDateTime.getTime())) {
        return NextResponse.json({ error: "Invalid date/time" }, { status: 400 });
      }

      const yday = getYDay(startDateTime);
      const hour = startDateTime.getHours();
      const minute = startDateTime.getMinutes();
      const length = getDurationInMinutes(startDateTime, dueDateTime);

      const baseTask = {
        title,
        desc,
        category: categoryId,
        targetType,
        targetIds,
        taskStart: { yday },
        taskTime: { hour, minute, length }
      };

      let newTask;
      console.log(baseTask)

      // if (recurring) {
      //   newTask = await RecurringTaskModel.create({
      //     ...baseTask,
      //     recurring: "true",
      //     recurringType,
      //     recurringEndDate,
      //     recurringDays: Array.isArray(recurringDays) ? recurringDays.join(",") : ""
      //   });
      // } else {
        newTask = await TaskModel.create({
          ...baseTask,
          isRecurring: null
        });
      // }

      return NextResponse.json(newTask, { status: 201 });
    } catch (error) {
      console.error("Failed to create task:", error);
      return NextResponse.json({ error: "Failed to create task" }, { status: 500 });
    }
}
