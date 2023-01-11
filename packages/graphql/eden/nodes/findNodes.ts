import { gql } from "@apollo/client";

export const FIND_NODES = gql`
  query ($fields: findNodesInput) {
    findNodes(fields: $fields) {
      _id
      name
      selected
      subNodes {
        _id
        name
        selected
      }
    }
  }
`;
