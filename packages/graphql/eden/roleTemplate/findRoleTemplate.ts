import { gql } from "@apollo/client";

export const FIND_ROLE_TEMPLATE = gql`
  query ($fields: findRoleTemplateInput) {
    findRoleTemplate(fields: $fields) {
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
