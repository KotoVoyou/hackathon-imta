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

// Declare Query aka getter
typeDefs.push(gql`
    type Query {
        users: [User]!
        user(id: ID!): User
    }
`);

// Declare Mutation aka setter
typeDefs.push(gql`
    type Mutation {
        createUser(name: String!, age: Int!, email: String): User!
        deleteUser(id: ID!): Boolean!
    }
`);

export { typeDefs };
