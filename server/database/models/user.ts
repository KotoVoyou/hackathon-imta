import { Schema, model } from "mongoose";

export interface User {
    name: string;
    age: number;
    email?: string;
}

const schema = new Schema<User>({
    name: { type: String, required: true },
    age: { type: Number, required: true },
    email: { type: String, required: false },
});

const user = model<User>("User", schema);

export { user };
