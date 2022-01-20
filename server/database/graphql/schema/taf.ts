import { gql } from "apollo-server-express";

export const tafSchema = gql`
    type TAF {
        id: ID!
        name: String!
        students: [Student]!
    }

    input TAFFilter {
        name: String
    }

    extend type Query {
        tafs(filter: TAFFilter): [TAF]!
        taf(id: ID!): TAF
    }
`;
