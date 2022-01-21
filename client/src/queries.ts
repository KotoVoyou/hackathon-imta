import { gql } from "@apollo/client";

export const GET_UES = gql`
    query Courses {
        courses {
            id
            name
            locations
            slots
            students{
                name
            }
            teachers{
                name
            }
        }
    }
`;

export const GET_TEACHERS = gql`
    query Teachers {
        teachers {
            name
            courses {
              name
              slots
              locations
            }
          }
    }
`;

export const GET_STUDENTS = gql`
    query Students {
        students {
            name
            courses {
                name
            }
        }
    }
`;
