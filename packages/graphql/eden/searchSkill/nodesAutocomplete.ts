import { gql } from "@apollo/client";

export const NODE_AUTOCOMPLETE = gql`
  query Nodes_autocomplete($fields: nodes_autocompleteInput) {
    nodes_autocomplete(fields: $fields) {
      _id
      node
      name
      subNodes {
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
  }
`;
