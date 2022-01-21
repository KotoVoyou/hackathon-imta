import { gql } from "apollo-server-express";

export const userSchema = gql`
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

    extend type Query {
        teachers: [Teacher]!
        teacher(id: ID!): Teacher

        students: [Student]!
        student(id: ID!): Student
    }
`;
