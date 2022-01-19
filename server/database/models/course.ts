import { Schema, model } from "mongoose";

enum Location {
    "Brest",
    "Nantes",
    "Rennes",
}

export interface Course {
    name: string;
    slots: Array<string>;
    locations: Array<Location>;
}

export interface CourseFilter {
    name?: string;
    slots?: string;
    locations?: Location;
}

const schema = new Schema<Course>({
    name: { type: String, required: true },
    slots: { type: [String] },
    locations: { type: [String] },
});

const courseModel = model("Course", schema);

export { courseModel };
