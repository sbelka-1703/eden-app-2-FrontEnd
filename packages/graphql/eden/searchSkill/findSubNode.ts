import { gql } from "@apollo/client";

export const FIND_SUB_NODE = gql`
  query findNodes($fields: findNodesInput) {
    findNodes(fields: $fields) {
      _id
      name
      node
      subNodes {
        _id
        name
        node
      }
    }
  }
`;
