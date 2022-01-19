import { Schema, model as mongooseModel } from "mongoose";

export interface Slot {
    name: string;
}

const schema = new Schema<Slot>({
    name: { type: String, required: true },
});

const model = mongooseModel<Slot>("Slot", schema);

export { model };
