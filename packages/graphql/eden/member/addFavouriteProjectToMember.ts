import { gql } from "@apollo/client";

export const ADD_FAVOURITE_PROJECT_TO_MEMBER = gql`
  mutation ($fields: addFavoriteProjectInput!) {
    addFavoriteProject(fields: $fields) {
      discordName
      projects {
        info {
          _id
          title
        }
        favorite
      }
    }
  }
`;
