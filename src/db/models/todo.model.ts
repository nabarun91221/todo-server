import { Schema, model } from "mongoose";

const TodoSchema = new Schema(
    {
        section_id: { type: Schema.Types.ObjectId, ref: "Section", required: true },

        todo_title: { type: String, required: true },

        todo_priority: {
            type: String,
            enum: ["LOW", "MEDIUM", "HIGH"],
            required: true,
        },

        todo_deadline: { type: Date, required: true },

        todo_links: [{ type: String }],

        todo_status: { type: Boolean, default: false },
    },
    { timestamps: true }
);

export const Todo = model("Todo", TodoSchema);
