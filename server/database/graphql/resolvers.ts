import { ObjectId } from "mongoose";
import { User } from "../models/user";
import {
    getUsers,
    getUserById,
    createUser,
    deleteUser,
} from "../../app/controllers/user";

import { CourseFilter } from "../models/course";
import { getCourseById, getCourses } from "../../app/controllers/course";

interface ID {
    id: ObjectId;
}

const resolvers = {
    Query: {
        users: () => getUsers(),
        user: (_: null, { id }: ID) => getUserById(id),
        courses: (_: null, { filter }: { filter: CourseFilter }) =>
            getCourses(filter),
        course: (_: null, { id }: ID) => getCourseById(id),
    },
    Mutation: {
        createUser: (_: null, user: User) => createUser(user),
        deleteUser: (_: null, { id }: ID) => deleteUser(id),
    },
};

export { resolvers };
