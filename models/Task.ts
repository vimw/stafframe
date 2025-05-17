// task schema ma wygladac tak samo jak taskI
import mongoose, { Schema } from "mongoose";

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
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    taskStart: {
        day: {
            type: Number,
            required: true
        },
        month: {
            type: Number,
            required: true
        }
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
        type: [mongoose.Schema.Types.ObjectId],
        required: true
    }
}, taskSchemaOptions);

const recurringTaskSchema = new Schema({
    dayInterval: {
        type: Number,
        required: true
    },
    count: {
        type: Number,
        required: true
    },
    resetOnStart: {
        type: Boolean,
        required: true
    }
});

const TaskModel = mongoose.models.Task || mongoose.model("Task", taskSchema);

const RecurringTaskModel = TaskModel.discriminator(
    "true",
    recurringTaskSchema
);

export { TaskModel, RecurringTaskModel }