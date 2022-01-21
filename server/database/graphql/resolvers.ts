import { ObjectId } from "mongoose";
import { User } from "../models/user";
import { getUsers, getUserById, createUser, deleteUser } from "../../app/controllers/user";

import { CourseFilter, CourseInput, CourseUpdate } from "../models/course";
import {
    createCourse,
    deleteCourse,
    getCourseById,
    getCourses,
    updateCourse,
} from "../../app/controllers/course";
import { getTAFs, getTAFById, createTAF } from "../../app/controllers/taf";
import { TAF } from "../models/taf";
import { getSlots, getSlotById, createSlot } from "../../app/controllers/slot";
import { Slot } from "../models/slot";

interface ID {
    id: ObjectId;
}

interface Input<T> {
    input: T;
}

interface Update<T> {
    id: ObjectId;
    update: T;
}

interface Filter<T> {
    filter: T;
}

const resolvers = {
    Query: {
        users: () => getUsers(),
        user: (_: null, { id }: ID) => getUserById(id),
        courses: (_: null, { filter }: Filter<CourseFilter>) => getCourses(filter),
        course: (_: null, { id }: ID) => getCourseById(id),
        tafs: () => getTAFs(),
        taf: (_: null, { id }: ID) => getTAFById(id),
        slots: () => getSlots(),
        slot: (_: null, { id }: ID) => getSlotById(id),
    },
    Mutation: {
        createUser: (_: null, user: User) => createUser(user),
        deleteUser: (_: null, { id }: ID) => deleteUser(id),
        createCourse: (_: null, { input }: Input<CourseInput>) => createCourse(input),
        updateCourse: (_: null, { id, update }: Update<CourseUpdate>) => updateCourse(id, update),
        deleteCourse: (_: null, { id }: ID) => deleteCourse(id),
        createTAF: (_: null, taf: TAF) => createTAF(taf),
        createSlot: (_: null, slot: Slot) => createSlot(slot),
    },
};

export { resolvers };
