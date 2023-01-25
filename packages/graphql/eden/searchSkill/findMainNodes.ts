import { gql } from "@apollo/client";

export const FIND_MAIN_NODES = gql`
  query findNodes($fields: findNodesInput) {
    findNodes(fields: $fields) {
      _id
      name
      node
    }
  }
`;
