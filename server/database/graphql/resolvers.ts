import { ObjectId } from "mongodb";
import {
    getCourseById,
    getCourses,
    getCourseStudents,
    getCourseTeachers,
} from "../../app/controllers/course";
import { getTAFs, getTAFById } from "../../app/controllers/taf";
import { getSlots, getSlotById } from "../../app/controllers/slot";
import { Student, Teacher } from "../models/user";
import {
    getStudentById,
    getStudentCourses,
    getStudents,
    getStudentTAF,
    getTAFStudents,
    getTeacherById,
    getTeacherCourses,
    getTeachers,
} from "../../app/controllers/user";
import { TAF, TAFFilter } from "../models/taf";
import { Course } from "../models/course";

interface ID {
    id: ObjectId;
}

// interface Input<T> {
//     input: T;
// }

// interface Update<T> {
//     id: ObjectId;
//     update: T;
// }

interface Filter<T> {
    filter: T;
}

const resolvers = {
    Query: {
        // users: () => getUsers(),
        // user: (_: null, { id }: ID) => getUserById(id),
        courses: () => getCourses(),
        course: (_: null, { id }: ID) => getCourseById(id),
        tafs: (_: null, { filter }: Filter<TAFFilter>) => getTAFs(filter),
        taf: (_: null, { id }: ID) => getTAFById(id),
        slots: () => getSlots(),
        slot: (_: null, { id }: ID) => getSlotById(id),
        teachers: () => getTeachers(),
        teacher: (_: null, { id }: ID) => getTeacherById(id),
        students: () => getStudents(),
        student: (_: null, { id }: ID) => getStudentById(id),
    },
    Course: {
        teachers: (course: Course) => getCourseTeachers(course.id),
        students: (course: Course) => getCourseStudents(course.id),
    },
    Student: {
        courses: (student: Student) => getStudentCourses(student.id),
        taf: (student: Student) => getStudentTAF(student.id),
    },
    Teacher: {
        courses: (teacher: Teacher) => getTeacherCourses(teacher.id),
    },
    TAF: {
        students: (taf: TAF) => getTAFStudents(taf.id),
    },
    // Mutation: {
    //     createUser: (_: null, user: User) => createUser(user),
    //     deleteUser: (_: null, { id }: ID) => deleteUser(id),
    //     createCourse: (_: null, { input }: Input<CourseInput>) => createCourse(input),
    //     updateCourse: (_: null, { id, update }: Update<CourseUpdate>) => updateCourse(id, update),
    //     deleteCourse: (_: null, { id }: ID) => deleteCourse(id),
    //     createTAF: (_: null, taf: TAF) => createTAF(taf),
    //     createSlot: (_: null, slot: Slot) => createSlot(slot),
    // },
};

export { resolvers };
