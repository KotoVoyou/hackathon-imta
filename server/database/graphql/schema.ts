import { gql } from "apollo-server-express";
import { DocumentNode } from "graphql";

var typeDefs: Array<DocumentNode> = [];

typeDefs.push(gql`
    type Student {
        id: ID!
        name: String!
        courses: [Course]!
        taf: TAF
    }

    type Teacher {
        id: ID!
        name: String!
        courses: [Course]!
    }
`);

typeDefs.push(gql`
    type TAF {
        id: ID!
        name: String!
        students: [Student]!
    }

    input TAFFilter {
        name: String
    }

    type Slot {
        id: ID!
        name: String!
    }
`);

typeDefs.push(gql`
    enum Location {
        Brest
        Nantes
        Rennes
    }

    type Course {
        id: ID!
        name: String!
        slots: [String]!
        locations: [Location]!
        students: [Student]!
        teachers: [Teacher]!
    }
`);

typeDefs.push(gql`
    type Query {
        tafs(filter: TAFFilter): [TAF]!
        taf(id: ID!): TAF

        slots: [Slot]!
        slot(id: ID!): Slot

        courses: [Course]!
        course(id: ID!): Course

        teachers: [Teacher]!
        teacher(id: ID!): Teacher

        students: [Student]!
        student(id: ID!): Student
    }
`);

// Declare all type
// typeDefs.push(gql`
//     type User {
//         id: ID!
//         name: String!
//         age: Int!
//         email: String
//     }
// `);

// input CourseInput {
//     name: String!
//     slots: [String]
//     locations: [Location]
// }

// input CourseUpdate {
//     name: String
//     slots: [String]
//     locations: [Location]
// }

// input CourseFilter {
//     name: String
//     slots: String
//     locations: Location
// }

// Declare Query aka getter

// users: [User]!
// user(id: ID!): User

// Declare Mutation aka setter
// typeDefs.push(gql`
//     type Mutation {
//         createUser(name: String!, age: Int!, email: String): User!
//         deleteUser(id: ID!): Boolean!

//         createCourse(input: CourseInput!): Course!
//         updateCourse(id: ID!, update: CourseUpdate!): Course!
//         deleteCourse(id: ID!): Boolean!

//         createTAF(name: String!): TAF!

//         createSlot(name: String!): Slot!
//     }
// `);

export { typeDefs };
