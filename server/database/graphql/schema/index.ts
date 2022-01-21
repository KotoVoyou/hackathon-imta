import { gql } from "apollo-server-express";

import { userSchema } from "./user";
import { courseSchema } from "./course";
import { tafSchema } from "./taf";
import { slotSchema } from "./slot";

const linkSchema = gql`
    type Query {
        _: Boolean
    }

    type Mutation {
        _: Boolean
    }
`;

export const schema = [
    linkSchema,
    userSchema,
    courseSchema,
    tafSchema,
    slotSchema,
];
