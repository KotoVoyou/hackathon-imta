import { ID } from "./index";
import {
    getCourses,
    getCourseById,
    getCourseTeachers,
    getCourseStudents,
} from "../../../app/controllers/course";
import { Course } from "../../models/course";

export const courseResolver = {
    Query: {
        courses: () => getCourses(),
        course: (_: null, { id }: ID) => getCourseById(id),
    },
    Course: {
        teachers: (course: Course) => getCourseTeachers(course.id),
        students: (course: Course) => getCourseStudents(course.id),
    },
};
