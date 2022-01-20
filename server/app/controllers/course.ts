import { ObjectId } from "mongodb";
import { Student, Teacher } from "../../database/models/user";
import {
    courseModel as model,
    Course,
    courseModel,
} from "../../database/models/course";

export const getCourses = (): Promise<Array<Course>> =>
    new Promise((resolve, reject) => {
        model
            .find()
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

export const getCourseStudents = (
    courseId: ObjectId
): Promise<Array<Student>> =>
    new Promise((resolve, reject) => {
        courseModel
            .findById(courseId)
            .select("students")
            .populate("students")
            .then(({ students }) => resolve(students))
            .catch((error) => reject(error));
    });

export const getCourseTeachers = (
    courseId: ObjectId
): Promise<Array<Teacher>> =>
    new Promise((resolve, reject) => {
        courseModel
            .findById(courseId)
            .select("teachers")
            .populate("teachers")
            .then(({ teachers }) => resolve(teachers))
            .catch((error) => reject(error));
    });

// export const createCourse = (newCourse: CourseInput): Promise<Course> =>
//     new Promise((resolve, reject) => {
//         model
//             .create(newCourse)
//             .then((course) => resolve(course))
//             .catch((error) => reject(error));
//     });

// export const updateCourse = (
//     id: ObjectId,
//     update: CourseUpdate
// ): Promise<Course> =>
//     new Promise((resolve, reject) => {
//         model
//             .findOneAndUpdate({ _id: id }, update, { new: true })
//             .then((course) => resolve(course))
//             .catch((error) => reject(error));
//     });

// export const deleteCourse = (id: ObjectId): Promise<boolean> =>
//     new Promise((resolve, reject) => {
//         model
//             .deleteOne({ _id: id })
//             .then((_) => resolve(true))
//             .catch((error) => reject(error));
//     });
