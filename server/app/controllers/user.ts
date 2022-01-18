import { ObjectId } from "mongoose";
import { user as userModel, User } from "../../database/models/user";

export const getUsers = (): Promise<Array<User>> =>
    new Promise((resolve, reject) => {
        userModel
            .find()
            .then((users) => resolve(users))
            .catch((error) => reject(error));
    });

export const getUserById = (id: ObjectId): Promise<User> =>
    new Promise((resolve, reject) => {
        userModel
            .findById(id)
            .then((user) => resolve(user))
            .catch((error) => reject(error));
    });

export const createUser = (newUser: User): Promise<User> =>
    new Promise((resolve, reject) => {
        userModel
            .create(newUser)
            .then((user) => resolve(user))
            .catch((error) => reject(error));
    });

export const deleteUser = (id: ObjectId): Promise<boolean> =>
    new Promise((resolve, reject) => {
        userModel
            .deleteOne({ _id: id })
            .then((_) => resolve(true))
            .catch((error) => reject(error));
    });
