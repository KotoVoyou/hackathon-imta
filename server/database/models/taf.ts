import { ObjectId } from "mongodb";
import { Schema, model as mongooseModel } from "mongoose";

export interface TAF {
    id: ObjectId;
    name: string;
}

export interface TAFFilter {
    name?: String;
}

const schema = new Schema<TAF>({
    name: { type: String, required: true },
});

const tafModel = mongooseModel<TAF>("TAF", schema);

export { tafModel };
