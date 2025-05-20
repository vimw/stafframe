import { CategoryModel } from "@/models/Categories"
import { connectDB } from "../db/db";

// DEPRECATED
// DEPRECATED
// DEPRECATED
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

async function getCategoriesByIds(ids: string[]) {
    await connectDB();
    const categories = await CategoryModel.find({
        _id: { $in: ids }
    }).lean().exec();

    const m = new Map();

    categories.forEach(el => {
        if(el.name !== undefined){
            m.set((el._id as any).toString(), stripIds(el));
        }
    })

    return m;
}

function stripIds(obj: any){
    const { _id, ...rest } = obj;
    return rest;
}

export { getCategoriesByNames, getCategoriesByIds };