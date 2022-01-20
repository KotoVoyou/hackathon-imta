import { ObjectId } from "mongodb";
import { tafModel, TAF } from "../../database/models/taf";
import { Course, courseModel } from "../../database/models/course";
import {
    userModel,
    User,
    teacherModel,
    Teacher,
    studentModel,
    Student,
} from "../../database/models/user";
import { getTAFById } from "./taf";

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

export const getStudents = (): Promise<Array<Student>> =>
    new Promise((resolve, reject) => {
        studentModel
            .find()
            .then((students) => resolve(students))
            .catch((error) => reject(error));
    });

export const getStudentById = (id: ObjectId): Promise<Student> =>
    new Promise((resolve, reject) => {
        studentModel
            .findById(id)
            .then((student) => resolve(student))
            .catch((error) => reject(error));
    });

export const getTeachers = (): Promise<Array<Teacher>> =>
    new Promise((resolve, reject) => {
        teacherModel
            .find()
            .then((teachers) => resolve(teachers))
            .catch((error) => reject(error));
    });

export const getTeacherById = (id: ObjectId): Promise<Teacher> =>
    new Promise((resolve, reject) => {
        teacherModel
            .findById(id)
            .then((teacher) => resolve(teacher))
            .catch((error) => reject(error));
    });

export const getStudentCourses = (
    studentId: ObjectId
): Promise<Array<Course>> =>
    new Promise((resolve, reject) => {
        courseModel
            .find({ students: studentId })
            .then((courses) => resolve(courses))
            .catch((error) => reject(error));
    });

export const getStudentTAF = (studentId: ObjectId): Promise<TAF | null> =>
    new Promise((resolve, reject) => {
        studentModel
            .findById(studentId)
            .select("taf")
            .populate("taf")
            .then(({ taf }) => resolve(taf || null))
            .catch((error) => reject(error));
    });

export const getTeacherCourses = (
    teacherId: ObjectId
): Promise<Array<Course>> =>
    new Promise((resolve, reject) => {
        courseModel
            .find({ teachers: teacherId })
            .then((courses) => resolve(courses))
            .catch((error) => reject(error));
    });

export const getTAFStudents = (tafId: ObjectId): Promise<Array<Student>> =>
    new Promise((resolve, reject) => {
        studentModel
            .find({ taf: tafId })
            .then((students) => resolve(students))
            .catch((error) => reject(error));
    });
