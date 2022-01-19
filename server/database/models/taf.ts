import { Schema, model as mongooseModel } from "mongoose";

export interface TAF {
    name: string;
}

const schema = new Schema<TAF>({
    name: { type: String, required: true },
});

const model = mongooseModel<TAF>("TAF", schema);

export { model };
