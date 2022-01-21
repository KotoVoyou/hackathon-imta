import { ObjectId } from "mongodb";
import { userResolver } from "./user";
import { courseResolver } from "./course";
import { tafResolver } from "./taf";
import { slotResolver } from "./slot";

export interface ID {
    id: ObjectId;
}

export interface Filter<T> {
    filter: T;
}

export const resolvers = [
    userResolver,
    courseResolver,
    tafResolver,
    slotResolver,
];
