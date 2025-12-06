import { Schema, model } from "mongoose";

const SectionSchema = new Schema(
    {
        user_id: { type: String, required: true },
        section_title: { type: String, required: true },
    },
    { timestamps: true } // <= auto creates createdAt and updatedAt
);

export const Section = model("Section", SectionSchema);
