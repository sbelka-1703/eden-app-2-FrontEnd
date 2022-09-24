import { gql } from "@apollo/client";

export const UPDATE_ROLE_TEMPLATE = gql`
  mutation ($fields: createRoleInput) {
    updateRoleTemplate(fields: $fields) {
      _id
      description
      title
      skills {
        _id
        name
      }
    }
  }
`;
