import { Schema } from "mongoose";

const categoriesSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    desc: String,
    bgColor: {
        type: String,
        required: true
    },
    color: String
});

