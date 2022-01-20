import { ObjectId } from "mongodb";
import { Schema, model } from "mongoose";
import { TAF } from "./taf";

export interface User {
    id: ObjectId;
    name: string;
}

export interface Student extends User {
    taf?: TAF;
}

export interface Teacher extends User {}

const userSchema = new Schema<User>(
    {
        name: { type: String, required: true },
    },
    {
        discriminatorKey: "kind",
    }
);

const userModel = model<User>("User", userSchema);

const studentSchema = new Schema<Student>({
    taf: { type: ObjectId, ref: "TAF" },
});

const studentModel = userModel.discriminator<Student>("Student", studentSchema);

const teacherSchema = new Schema<Teacher>();

const teacherModel = userModel.discriminator<Teacher>("Teacher", teacherSchema);

export { userModel, studentModel, teacherModel };
