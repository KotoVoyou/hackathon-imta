import { gql } from "apollo-server-express";

export const slotSchema = gql`
    type Slot {
        id: ID!
        name: String!
    }

    extend type Query {
        slots: [Slot]!
        slot(id: ID!): Slot
    }
`;
