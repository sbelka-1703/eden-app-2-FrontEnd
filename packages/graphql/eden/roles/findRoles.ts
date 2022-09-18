import { gql } from "@apollo/client";

export const FIND_ROLES = gql`
  query FindRoles($fields: findRolesInput) {
    findRoles(fields: $fields) {
      _id
      name
    }
  }
`;
