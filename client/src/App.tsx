import React from "react";

import { useQuery, gql } from "@apollo/client";
import { FullUE } from "./models";
import { FilterableTable } from "./catalogue/UETable";

interface Course {
    id: string;
    name?: string;
    slots?: Array<string>;
    locations?: Array<string>;
    students?: Array<Student>;
    teachers?: Array<Teacher>;
}

interface Student {
    id: string;
    name?: string;
    courses?: Array<Course>;
    taf?: TAF;
}

interface Teacher {
    id: string;
    name?: string;
    courses?: Array<Course>;
}

interface TAF {
    id: string;
    name?: string;
    students?: Array<Student>;
}

const gqlRequest = `
{
    courses {
        id
        name
        slots
        locations
        teachers {
          name
        }
        students {
          name
        }
    }
}
`;

const App = () => {
    const { loading, error, data } = useQuery(gql(gqlRequest));

    if (loading) return <p>Chargement...</p>;
    if (error) return <p>Erreur</p>;

    if (data.courses) {
        const courses: FullUE[] = data.courses;
        return <FilterableTable ues={courses}/>;
    }

    if (data.students) {
        const students: Array<Student> = data.students;
        return StudentList({ students });
    }

    if (data.teachers) {
        const teachers: Array<Teacher> = data.teachers;
        return TeacherList({ teachers });
    }

    return <p>Rien à afficher</p>;
};

const CourseComponent = ({ course }: { course: Course }) => {
    return (
        <div>
            <h1>{course.name}</h1>
            {course.locations && (
                <p>{course.locations.map((location) => location)}</p>
            )}
            {course.slots && <p>{course.slots.map((slot) => slot)}</p>}
            {course.students && (
                <ul>{StudentList({ students: course.students })}</ul>
            )}
            {course.teachers && (
                <ul>{TeacherList({ teachers: course.teachers })}</ul>
            )}
        </div>
    );
};

const CourseList = ({ courses }: { courses: Array<Course> }) => {
    const courseList = courses.map((course) => (
        <li>{CourseComponent({ course })}</li>
    ));

    return <ul>{courseList}</ul>;
};

const StudentComponent = ({ student }: { student: Student }) => {
    let { name, taf, courses } = student;

    return (
        <div>
            {name && <h3>{name}</h3>}
            {taf && TAFComponent({ taf })}
            {courses && CourseList({ courses })}
        </div>
    );
};

const StudentList = ({ students }: { students: Array<Student> }) => {
    const studentList = students.map((student) => (
        <li>{StudentComponent({ student })}</li>
    ));

    return (
        <>
            <h2>Etudiants:</h2>
            <ul>{studentList}</ul>
        </>
    );
};

const TeacherComponent = ({ teacher }: { teacher: Teacher }) => {
    let { name, courses } = teacher;

    return (
        <div>
            {name && <h3>{name}</h3>}
            {courses && CourseList({ courses })}
        </div>
    );
};

const TeacherList = ({ teachers }: { teachers: Array<Teacher> }) => {
    const teacherList = teachers.map((teacher) => (
        <li>{TeacherComponent({ teacher })}</li>
    ));

    return (
        <>
            <h2>Profs:</h2>
            <ul>{teacherList}</ul>
        </>
    );
};

const TAFComponent = ({ taf }: { taf: TAF }) => {
    let { name, students } = taf;

    return (
        <div>
            {name && <h4>{name}</h4>}
            {students && StudentList({ students })}
        </div>
    );
};

export default App;
