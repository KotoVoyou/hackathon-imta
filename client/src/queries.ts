import { gql } from "@apollo/client";

export const GET_UES = gql`
    query Courses {
        courses {
            id
            name
            locations
            slots
        }
    }
`;
