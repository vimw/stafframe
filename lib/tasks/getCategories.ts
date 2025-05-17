import { CategoryModel } from "@/models/Categories"
import { connectDB } from "../db/db";

async function getCategoriesByNames(names: string[]) {
    await connectDB();
    const categories = await CategoryModel.find({
        name: { $in: names }
    }).exec();

    return categories.reduce(
        (map, cat) => {
        map[cat.name] = {
            bgColor: cat.bgColor,
            color: cat.color ?? undefined
        };
        return map;
        },
        {} as { [key: string]: { bgColor: string; color?: string } }
    );
}

export { getCategoriesByNames };