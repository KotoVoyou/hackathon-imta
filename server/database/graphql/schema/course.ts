import { gql } from "apollo-server-express";

export const courseSchema = gql`
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

    extend type Query {
        courses: [Course]!
        course(id: ID!): Course
    }
`;
