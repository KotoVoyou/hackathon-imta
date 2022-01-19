import { ObjectId } from "mongoose";
import {
    courseModel as model,
    Course,
    CourseFilter,
    CourseInput,
    CourseUpdate,
} from "../../database/models/course";

export const getCourses = (filter: CourseFilter = {}): Promise<Array<Course>> =>
    new Promise((resolve, reject) => {
        model
            .find(filter)
            .then((courses) => resolve(courses))
            .catch((error) => reject(error));
    });

export const getCourseById = (id: ObjectId): Promise<Course> =>
    new Promise((resolve, reject) => {
        model
            .findById(id)
            .then((course) => resolve(course))
            .catch((error) => reject(error));
    });

export const createCourse = (newCourse: CourseInput): Promise<Course> =>
    new Promise((resolve, reject) => {
        model
            .create(newCourse)
            .then((course) => resolve(course))
            .catch((error) => reject(error));
    });

export const updateCourse = (
    id: ObjectId,
    update: CourseUpdate
): Promise<Course> =>
    new Promise((resolve, reject) => {
        model
            .findOneAndUpdate({ _id: id }, update, { new: true })
            .then((course) => resolve(course))
            .catch((error) => reject(error));
    });

export const deleteCourse = (id: ObjectId): Promise<boolean> =>
    new Promise((resolve, reject) => {
        model
            .deleteOne({ _id: id })
            .then((_) => resolve(true))
            .catch((error) => reject(error));
    });
