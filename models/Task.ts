// task schema ma wygladac tak samo jak taskI
import { Schema } from "mongoose";

const taskTimeSchema = new Schema({
    hour: {
        type: Number,
        required: true
    },
    minute: {
        type: Number,
        required: true
    },
    length: {
        type: Number,
        required: true
    }
});

const taskSchemaOptions = {
    discriminatorKey: "recurring",
    collection: "tasks"
}

const taskSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    desc: String,
    category: {
        type: String,
        required: true
    },
    taskTime: {
        type: taskTimeSchema,
        required: true
    },
    targetType: {
        type: String,
        required: true
    },
    targetIds: {
        type: [String],
        required: true
    }
}, taskSchemaOptions);