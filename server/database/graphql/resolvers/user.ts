import { ID } from "./index";
import {
    getStudentById,
    getStudentCourses,
    getStudents,
    getStudentTAF,
    getTeacherById,
    getTeacherCourses,
    getTeachers,
} from "../../../app/controllers/user";
import { Student, Teacher } from "../../models/user";

export const userResolver = {
    Query: {
        teachers: () => getTeachers(),
        teacher: (_: null, { id }: ID) => getTeacherById(id),
        students: () => getStudents(),
        student: (_: null, { id }: ID) => getStudentById(id),
    },
    Student: {
        courses: (student: Student) => getStudentCourses(student.id),
        taf: (student: Student) => getStudentTAF(student.id),
    },
    Teacher: {
        courses: (teacher: Teacher) => getTeacherCourses(teacher.id),
    },
};
