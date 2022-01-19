import { Schema, model, ObjectId } from "mongoose";

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

export interface CourseInput {
    name: string;
    slots?: Array<string>;
    locations?: Array<string>;
}

export interface CourseUpdate {
    name?: string;
    slots?: string;
    locations?: Location;
}
export interface CourseFilter {
    name?: string;
    slots?: string;
    locations?: Location;
}

const schema = new Schema<Course>({
    name: { type: String, required: true },
    slots: { type: [String], required: true, default: [] },
    locations: { type: [String], required: true, default: [] },
});

const courseModel = model("Course", schema);

export { courseModel };
