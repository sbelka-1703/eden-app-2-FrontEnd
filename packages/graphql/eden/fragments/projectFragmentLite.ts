import { gql } from "@apollo/client";

export const ProjectFragmentLite = gql`
  fragment ProjectFragmentLite on Project {
    _id
    title
    description
    descriptionOneLine
    emoji
    backColorEmoji
    role {
      _id
      title
    }
  }
`;
