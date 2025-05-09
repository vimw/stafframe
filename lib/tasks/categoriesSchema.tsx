import { Schema, model } from "mongoose";

const categoriesSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    desc: String,
    bgColor: {
        type: String,
        required: true
    },
    color: String
});

const categoryModel = model("Category", categoriesSchema, "categories");

export { categoryModel };
