import { ObjectId } from "mongoose";
import {
    courseModel as model,
    Course,
    CourseFilter,
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
