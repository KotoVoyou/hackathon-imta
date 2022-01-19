import { gql } from "apollo-server-express";
import { DocumentNode } from "graphql";

var typeDefs: Array<DocumentNode> = [];

// Declare all type
typeDefs.push(gql`
    type User {
        id: ID!
        name: String!
        age: Int!
        email: String
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
    }

    input CourseInput {
        name: String!
        slots: [String]
        locations: [Location]
    }

    input CourseUpdate {
        name: String
        slots: [String]
        locations: [Location]
    }

    input CourseFilter {
        name: String
        slots: String
        locations: Location
    }
`);

// Declare Query aka getter
typeDefs.push(gql`
    type Query {
        users: [User]!
        user(id: ID!): User
        courses(filter: CourseFilter): [Course]!
        course(id: ID!): Course
    }
`);

// Declare Mutation aka setter
typeDefs.push(gql`
    type Mutation {
        createUser(name: String!, age: Int!, email: String): User!
        deleteUser(id: ID!): Boolean!
        createCourse(input: CourseInput!): Course!
        updateCourse(id: ID!, update: CourseUpdate!): Course!
        deleteCourse(id: ID!): Boolean!
    }
`);

export { typeDefs };
