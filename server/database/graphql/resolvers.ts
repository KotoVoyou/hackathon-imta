import {
    getUsers,
    getUserById,
    createUser,
    deleteUser,
} from "../../app/controllers/user";
import { ObjectId } from "mongoose";
import { User } from "../models/user";

interface ID {
    id: ObjectId;
}

const resolvers = {
    Query: {
        users: () => getUsers(),
        user: (_: null, { id }: ID) => getUserById(id),
    },
    Mutation: {
        createUser: (_: null, user: User) => createUser(user),
        deleteUser: (_: null, { id }: ID) => deleteUser(id),
    },
};

export { resolvers };
