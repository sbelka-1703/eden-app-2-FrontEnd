import { gql } from "@apollo/client";

export const FIND_NODES = gql`
  query ($fields: findNodesInput) {
    findNodes(fields: $fields) {
      _id
      name
      node
      selected
      subNodes {
        _id
        name
        node
        selected
        aboveNodes {
          _id
          name
          node
        }
      }
    }
  }
`;
