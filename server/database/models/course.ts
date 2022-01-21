import { ObjectId } from "mongodb";
import { Schema, model } from "mongoose";
import { Student, Teacher } from "./user";

enum Location {
    "Brest",
    "Nantes",
    "Rennes",
}

export interface Course {
    id: ObjectId;
    name: string;
    slots: Array<string>;
    locations: Array<Location>;
    students: Array<Student>;
    teachers: Array<Teacher>;
}

// export interface CourseInput {
//     name: string;
//     slots?: Array<string>;
//     locations?: Array<string>;
// }

// export interface CourseUpdate {
//     name?: string;
//     slots?: string;
//     locations?: Location;
// }
// export interface CourseFilter {
//     name?: string;
//     slots?: string;
//     locations?: Location;
// }

const schema = new Schema<Course>({
    name: { type: String, required: true },
    slots: { type: [String], required: true, default: [] },
    locations: { type: [String], required: true, default: [] },
    students: { type: [ObjectId], ref: "User", required: true, default: [] },
    teachers: { type: [ObjectId], ref: "User", required: true, default: [] },
});

const courseModel = model("Course", schema);

export { courseModel };
