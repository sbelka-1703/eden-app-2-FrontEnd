import { gql } from "@apollo/client";

export const ProjectFragmentLite = gql`
  fragment ProjectFragmentLite on Project {
    _id
    description
    title
    role {
      _id
      title
    }
  }
`;
